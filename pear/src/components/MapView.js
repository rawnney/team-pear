import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import {Modal, Button} from 'reactstrap'
import EnemyComponent from './EnemyComponent'
import Pinjump from './Pinjump'
import Markers from './Markers'
import Images from '../libs/Imgs'
import PlayerComponent from './PlayerComponent'
// import WinnerPopUp from './WinnerPopUp'
import Coordinates from '../assets/json/coordinates'
let {Monster} = Images

class MapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeMonsterName: undefined,
      activeMonsterAvatar: undefined,
      activeMonsterCoins: undefined,
      monsterMarkers: [],
      didSetMonsters: false,
      fightViewOpened: false,
      winnerIsSet: false,
      playerWin: false,
      monsterWin: false,
      enemyHP: 100,
      playerHP: 100,
      monstersKilled: this.props.setUser.monstersKilled,
      user: this.props.setUser,
      coins: this.props.setUser.coins,
      playerTurn: false,
      monsterTurn: false,
      displayDmg: undefined,
      displayReduction: undefined,
      waitForMonster: false
    }
  }

  componentDidMount () {
    this.setMonsters()
  }

  // componentWillUpdate (nextProps, nextState) {
  //  this.setMonsters(nextProps, nextState)
  // }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  render () {
    let {monsterMarkers, fightViewOpened, winnerIsSet, enemyHP, playerHP, activeMonsterName,
      activeMonsterAvatar, user, playerTurn, monsterTurn, waitForMonster} = this.state
    let {isGeolocationAvailable, isGeolocationEnabled, coords} = this.props
    if (!user) return <div/>
    if (!isGeolocationAvailable) return <div style={styles.infoMsg}>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) return <div style={styles.infoMsg}>You must enable Geolocation to play this game!</div>
    if (!coords) return <Pinjump />
    //console.log(coords.longitude,coords.latitude);
    //setTimeout(this.setState({playerCoords: {lng: coords.longitude, lat: coords.latitude}}), 2000)
    setTimeout(() => {
      this.setState({playerCoords: {lng: coords.longitude, lat: coords.latitude}})
    }, 5000)

    console.log(this.state.playerCoords);
    return <div>
      <Markers
        lng={coords.longitude}
        lat={coords.latitude}
        toggleFightView={this.toggleFightView}
        accuracy={coords.accuracy}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCerbPPD0V2qOoQC1QJbNSlxfUWsxYAmo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={styles.mapStyle} />}
        containerElement={<div style={styles.mapStyle} />}
        mapElement={<div style={styles.mapStyle} />}
        markers={monsterMarkers}
      />
      <Modal isOpen={fightViewOpened} togglemod={this.toggleFightView}>
        <div style={styles.wrapper}>
          {winnerIsSet ? this.renderExit() : <div />}
          <EnemyComponent enemyHP={enemyHP} name={activeMonsterName} avatar={activeMonsterAvatar}/>
          <div style={styles.console}>
            {winnerIsSet ? this.renderWinner() : <div />}
            {!winnerIsSet && playerTurn ? this.logDmgGiven() : <div />}
            {!winnerIsSet && monsterTurn ? this.logDmgTaken() : <div />}
          </div>
          <PlayerComponent playerHP={playerHP} username={user.username} avatar={user.avatar}/>
          <div style={styles.buttonWrapper}>
            <Button onClick={this.playerAttack} disabled={waitForMonster} color='danger' style={styles.buttonStyle}>Attack</Button>
          </div>
        </div>
      </Modal>
    </div>
  }

  // TODO: randomize coindrop (depending on monster)  // this.setActiveMonsterCoins(id)
  toggleFightView = (id) => {
    let {fightViewOpened} = this.state
    if (fightViewOpened === false) return this.initFight(id)
    if (fightViewOpened === true) return this.resetFight(id)
  }

  initFight = (id) => {
    let {fightViewOpened} = this.state
    this.setState({
      fightViewOpened: !fightViewOpened,
      activeMonsterName: this.setActiveMonsterName(id),
      activeMonsterAvatar: this.setActiveMonsterAvatar(id),
      waitForMonster: false,
      playerWin: false,
      monsterWin: false,
      activeMonsterID: id
    })
  }

  resetFight = () => {
    let {fightViewOpened} = this.state
    this.setState({
      fightViewOpened: !fightViewOpened,
      enemyHP: 100,
      playerHP: 100,
      winnerIsSet: false,
      playerTurn: false,
      monsterTurn: false,
      playerWin: false,
      monsterWin: false
    })
  }

  playerWin = (id) => {
    let {monstersKilled, coins} = this.state
    let {updateUser} = this.props
    this.killCounter()
    this.incCoins(id)
    this.removeMonster(id)
    this.setState({winnerIsSet: true, playerWin: true})
    updateUser(monstersKilled, coins)
  }

  playerLoose = () => {
    this.setState({winnerIsSet: true, monsterWin: true, waitForMonster: true})
  }

  setActiveMonsterName = (id) => {
    let {monsterMarkers} = this.state
    console.log(monsterMarkers[id])
    return monsterMarkers[id].name
  }
  setActiveMonsterAvatar = (id) => {
    let {monsterMarkers} = this.state
    return monsterMarkers[id].icon
  }

  renderWinner = () => {
    let {playerWin, monsterWin} = this.state
    if (playerWin === true) return <div style={styles.winnerText}>YOU WIN! </div>
    if (monsterWin === true) return <div style={styles.winnerText}>YOU ARE LOOSER</div>
  }

  renderExit = () => {
    return <Button onClick={this.toggleFightView} style={styles.closeButton}>X</Button>
  }

  logDmgGiven = () => {
    let {displayDmg} = this.state
    return <div style={styles.logDmgGiven}>You hit for {displayDmg} dmg!</div>
  }

  logDmgTaken = () => {
    let {displayDmg, displayReduction} = this.state
    if (displayReduction <= 0) return <div style={styles.logDmgTaken}>You took {displayDmg} dmg!</div>
    if (displayReduction) return <div style={styles.logDmgTaken}> You took {displayDmg} dmg! ({displayReduction} dmg mitigated)</div>
  }

  calcPlayerAttack = () => {
    let {user} = this.state // TODO fix this
    let baseDmg = 10
    let attackDmg = 1 + (user.attack / 100)
    let totalDmg = baseDmg * attackDmg
    let rawDmgGiven = Math.ceil(Math.floor(Math.random() * (totalDmg - baseDmg)) + baseDmg)
    return rawDmgGiven
  }

  calcMonsterAttack = () => {
    let baseDmg = 10
    let attackDmg = 1.25
    let totalDmg = baseDmg * attackDmg
    let rawDmgTaken = Math.ceil(Math.floor(Math.random() * (totalDmg - baseDmg)) + baseDmg)
    return rawDmgTaken
  }

  clacPlayerDmgReduction = () => {
    let {user} = this.state
    let baseReduction = 5
    let itemReduction = user.block
    let maxReduction = baseReduction + itemReduction
    let dmgReduction = Math.ceil((Math.floor(Math.random() * (maxReduction - baseReduction)) + baseReduction) / 5)
    return dmgReduction
  }

  playerAttack = () => {
    let {enemyHP, playerHP} = this.state
    let rawDmgGiven = this.calcPlayerAttack()
    let rawDmgTaken = this.calcMonsterAttack()
    let dmgReduction = this.clacPlayerDmgReduction()
    let dmgWithReduction = rawDmgTaken - dmgReduction
    if (enemyHP > 0 || enemyHP !== 0) {
      this.setState({playerTurn: true,
        monsterTurn: false,
        enemyHP: enemyHP - rawDmgGiven,
        displayDmg: rawDmgGiven,
        waitForMonster: true})
    }
    if (enemyHP === 0 || rawDmgGiven > enemyHP || rawDmgGiven === enemyHP) return this.playerWin(this.state.activeMonsterID)
    setTimeout(() => {
      if (playerHP < 0 || rawDmgTaken > playerHP) return this.playerLoose()
      if (playerHP > 0) {
        this.setState({playerTurn: false,
          monsterTurn: true,
          playerHP: playerHP - dmgWithReduction,
          displayDmg: dmgWithReduction,
          displayReduction: dmgReduction,
          waitForMonster: false})
      }
    }, 1500)
  }

  killCounter = () => {
    let {monstersKilled} = this.state
    this.setState({monstersKilled: monstersKilled + 1})
  }

  incCoins = () => {
    let {coins} = this.state
    this.setState({coins: coins + 2})
  }

  removeMonster = (id) => {
    let {monsterMarkers} = this.state
    // monsterMarkers.splice(id, 1)
    // console.log("id:" + id);
    // console.log(monsterMarkers[id].icon)
    monsterMarkers[id].alive = false
    this.setState({monsterMarkers: monsterMarkers})
  }

  // TODO: Respawn monsters! for loop setState({markers -> Alive})

  setMonsters = (nextProps, nextState) => {

    let {monsterCount} = this.state
    let {lat, lon} = nextProps.coords
    let {monsterMarkers, didSetMonsters} = nextState
     if (didSetMonsters) return

    var mapCoordinates = {Coordinates}
    //console.log(mapCoordinates.Coordinates.features);
    var x = [], monstersToRender = [];
    for (var {properties: {Name: n, gx_media_links: img}, geometry: {coordinates: [c, d]}} of mapCoordinates.Coordinates.features) {
      //console.log('Name: ' + n + ', Father: ' + c + " " + d);
      let images = QMark //this.randomIcon()
      x.push({name: n, latitude: d, longitude: c, icon: img})

    }
    for (var i = 0; i < x.length; i++) {
      monstersToRender.push({id: i, latitude: x[i].latitude, longitude: x[i].longitude, icon: x[i].icon, name: x[i].name, alive: true})
    }
    this.setState({monsterMarkers: monstersToRender, didSetMonsters: true})
  }

/*
exampel1:

var rad = function (x) {
  return x * Math.PI / 180;
};

var getDistance = function (p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
*/

  checkMonsterDistance = (d) => {
    let {monsterMarkers, playerCoords, checkMonsterDistance,} = this.state

    var rad = function(y) {
      return y * Math.PI / 180;
    };

    //p1 = playerCoords, p2 = monsterMarkers
    var getDistance = function(playerCoords, monsterMarkers) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(monsterMarkers.latitude() - playerCoords.latitude());
      var dLong = rad(monsterMarkers.longitude() - playerCoords.longitude());
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(playerCoords.latitude())) * Math.cos(rad(monsterMarkers.latitude())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      console.log(d);
        return d ; // returns the distance in meter
    }
  }


  // TODO: If we don't want the ?-icon we can randomize icons
  // randomIcon = () => {
  // let images = [Monster, Robin]
  //   return images[Math.floor(Math.random() * images.length)]
  // }

  getMonsterCoord (latitude, longitude, index) {
    let pos = index * 0.002,
        neg = index * 0.001,
        result
    result = Math.floor(Math.random() * (pos + neg)) - neg
    result = result < 0 ? result : result
    latitude = latitude + result
    longitude = longitude + result
    return {latitude, longitude}
  }

  //Sudocode
  /*
    adeventlistner.distance(
    if (distance > 15m){
      return monster fightViewOpened
    }else{
      return(you are not close enough to the marker)
    }
  )

  checklist to solve:
    1. find out how to calculate distance
    2. find out how to check what the distance is to all the markers
    3. make function that check if the player is closer than x to the marker.
    4.


    exampel1:
    var rad = function(x) {
      return x * Math.PI / 180;
    };

    var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
      return d; // returns the distance in meter
    };

    exampel2:
    var latitude1 = 39.46;
    var longitude1 = -0.36;
    var latitude2 = 40.40;
    var longitude2 = -3.68;

    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));


    How it works.
  */

}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  userDecisionTimeout: 5000,
  watchPosition: true
})(MapView)

let styles = {
  mapStyle: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    zIndex: -1000
  },
  infoMsg: {
    marginTop: '200px',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  console: {
    height: '30px'
  },
  logDmgGiven: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'blue'
  },
  logDmgTaken: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'red'
  },
  closeButton: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginLeft: '20px'
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    display: 'flex',
    flex: '1',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: '0 5px'
  },
  buttonStyle: {
    width: '30%'
  },
  winnerText: {
    textAlign: 'center'
  }
}
