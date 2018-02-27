import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import {Modal, Button} from 'reactstrap'
import fakeServerData from '../fakeServerData'
import EnemyComponent from './EnemyComponent'
import Pinjump from './Pinjump'
import Markers from './Markers'
import Images from '../libs/Imgs'
import PlayerComponent from './PlayerComponent'
import WinnerPopUp from './WinnerPopUp'
import Coordinates from '../assets/json/coordinates'
let {Monster, Robin, QMark} = Images

type Props = {
  coords: Object,
  isGeolocationAvailable: boolean,
  isGeolocationEnabled: boolean
}

type State = {
  monsterMarkers: Array<*>,
  didSetMonsters: boolean,
  fightViewOpened: boolean,
  monsterCount: Number,
  winnerIsSet: false
}

class MapView extends Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      monster: fakeServerData.monster,
      activeMonsterName: undefined,
      activeMonsterAvatar: undefined,
      activeMonsterCoins: undefined,
      monsterMarkers: [],
      didSetMonsters: false,
      fightViewOpened: false,
      winnerIsSet: false,
      enemyHP: 100,
      playerHP: 100,
      monsterCount: fakeServerData.monster.length,
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

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {
    this.setMonsters(nextProps, nextState)
  }

  render () {
    let {monsterMarkers, fightViewOpened, winnerIsSet, enemyHP, playerHP, activeMonsterName,
       activeMonsterAvatar, user, playerTurn, monsterTurn, waitForMonster} = this.state
    let {coords, isGeolocationAvailable, isGeolocationEnabled} = this.props
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
            {/*<Button onClick={this.playerAttack} color='danger' style={styles.buttonStyle}>Attack</Button>*/}
          </div>
        </div>
      </Modal>
    </div>
  }

// TODO: randomize coindrop (depending on monster)  // this.setActiveMonsterCoins(id)
  toggleFightView = (id) => {
    let {fightViewOpened, enemyHP, playerHP} = this.state
    if (!fightViewOpened) return this.initFight(id)
    if (enemyHP === 0 || enemyHP < 0) return this.playerWin(id)
    if ( playerHP === 0 || playerHP < 0) return this.playerLoose(id)
  }

  playerWin = (id) => {
    let {monstersKilled, coins, fightViewOpened} = this.state
    let {updateUser} = this.props
    this.killCounter()
    this.incCoins(id)
    this.removeMonster(id)
    updateUser(monstersKilled, coins)
    this.setState({
      fightViewOpened: !fightViewOpened,
      enemyHP: 100,
      playerHP: 100,
      winnerIsSet: false,
      playerTurn: false,
      monsterTurn: false
    })
  }

  initFight = (id) => {
    let {fightViewOpened} = this.state
    this.setState({
      fightViewOpened: !fightViewOpened,
      activeMonsterName: this.setActiveMonsterName(id),
      activeMonsterAvatar: this.setActiveMonsterAvatar(id),
      waitForMonster: false
    })
  }

  playerLoose = () => {
    return <div style={styles.winnerText}>
    YOU ARE LOOSER, YOU SUCK SO HARD! ACCOUNT DELETED! LOL NOOB.
    </div>
  }

  setActiveMonsterName = (id) => {return fakeServerData.monster[id].monsterName}
  setActiveMonsterAvatar = (id) => {return fakeServerData.monster[id].monsterAvatar}
  // TODO: randomize coindrop  // setActiveMonsterCoins = (id) => {return fakeServerData.monster[id].coins}

  renderWinner = () => {
    return (
      <WinnerPopUp />
    )
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
    let baseDmg = 10
    let attackDmg = 1.25
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
    let baseReduction = 5
    let itemReduction = 15
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
    if (enemyHP > 0 || enemyHP !== 0) {
      this.setState({playerTurn: true, monsterTurn: false, enemyHP: enemyHP - rawDmgGiven, displayDmg: rawDmgGiven, waitForMonster: true})}
    if (enemyHP === 0 || rawDmgGiven > enemyHP) return this.setState({winnerIsSet: true})
        setTimeout(() => {
        if (playerHP < 0 || rawDmgTaken > playerHP) this.setState({winnerIsSet: true})
        if (playerHP > 0 ) this.setState({playerTurn: false, monsterTurn: true,
          playerHP: playerHP - dmgWithReduction, displayDmg: dmgWithReduction, displayReduction: dmgReduction, waitForMonster: false})
      }, 1500)
  }

  killCounter = () => {
    let {monstersKilled} = this.state
    this.setState({monstersKilled: monstersKilled + 1})
  }

  incCoins = () => {
    let {coins} = this.state
    this.setState({coins: coins + 2 })
  }

  removeMonster = (id, latitude, longitude) => {
    let {monsterMarkers, monsterCount} = this.state
      monsterMarkers.splice(id, 1)
    this.setState({monsterMarkers: monsterMarkers, monsterCount: monsterCount -1})
  }

// TODO: Respawn monsters!

  // respawnMonster = () => {
  //   let {monsterCount, monsterMarkers} = this.state
  //   let addMonsters = newMonsterMarkers
  //   if (monsterCount > 5) return addMonster((monsterMarkers) => {
  //   })
  // }

  setMonsters = (nextProps, nextState) => {
    let {monsterCount} = this.state
    let {lat, lon} = nextProps.coords
    let {monsterMarkers, didSetMonsters} = nextState

    //if ((!lat || !lon) || (lat === null || lon === null) || (didSetMonsters)) return

     //if (!lat || !lon) return
     //if (lat=== null || lon === null) return
     if (didSetMonsters) return

    //let monsters = coordinates(monsterCount).fill(0) //new Array(monsterCount).fill(0)

//   { 'type': 'Feature', 'properties': { 'Name': 'Skolan KYH Stockholm', 'description': null, 'timestamp': null, 'begin': null, 'end':
// null, 'altitudeMode': null, 'tessellate': -1, 'extrude': 0, 'visibility': -1, 'drawOrder': null, 'icon': null },
// 'geometry': { 'type': 'Point', 'coordinates': [ 18.1102484, 59.3132238, 0.0 ] } },

/*
      { 'type': 'Feature', 'properties': { 'Name': 'Skolan KYH Stockholm', 'description': '<img src="https:\/\/lh4.googleusercontent.com\/FL61YrNA71QAeDBrrATL_8RyCXFIWLxLIv7Smb2kiT3SeQHEA8qgzYqrvOHwfzb6BqzDc1y_TG9bgkU9Nu_CR7Tfn5q53RDv5qPBihcPDrbKrl7DCadAoDeAe0aGbL1xHsWCvok" height="200" width="auto" \/><br><br>', 'timestamp': null, 'begin': null, 'end': null, 'altitudeMode': null, 'tessellate': -1, 'extrude': 0, 'visibility': -1, 'drawOrder': null, 'icon': null, 'gx_media_links': 'https:\/\/lh4.googleusercontent.com\/FL61YrNA71QAeDBrrATL_8RyCXFIWLxLIv7Smb2kiT3SeQHEA8qgzYqrvOHwfzb6BqzDc1y_TG9bgkU9Nu_CR7Tfn5q53RDv5qPBihcPDrbKrl7DCadAoDeAe0aGbL1xHsWCvok' }, 'geometry': { 'type': 'Point', 'coordinates': [ 18.1102484, 59.3132238, 0.0 ] } },
*/

    var mapCoordinates = {Coordinates}
    //console.log(mapCoordinates.Coordinates.features);
    var x = [], monstersToRender = [];
    for (var {properties: {Name: n, gx_media_links: img}, geometry: {coordinates: [c, d]}} of mapCoordinates.Coordinates.features) {
      //console.log('Name: ' + n + ', Father: ' + c + " " + d);
      let images = QMark //this.randomIcon()
      x.push({name: n, latitude: d, longitude: c, icon: img})

    }
    //console.log(x);
    for (var i=0; i<x.length; i++) {
      monstersToRender.push({id: i, latitude: x[i].latitude, longitude: x[i].longitude, icon: x[i].icon})
      //console.log(x[i]);
    }

    // monsters.map((item, index) => {
    //   let coord = this.getMonsterCoord(latitude, longitude, index)
    //   let images = QMark //this.randomIcon()
    //   monstersToRender.push({id: index, latitude: coord.latitude, longitude: coord.longitude, icon: images})
    // })

    this.setState({monsterMarkers: x, didSetMonsters: true})
  }

/*
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
*/

  checkMonsterDistance = (d) => {
    let {playerCoords} = this.state

    var rad = function(y) {
      return y * Math.PI / 180
    }

    //p1 = playerCoords, p2 = monstersToRender
    var getDistance = function(playerCoords, monstersToRender) {
    var R = 6378137 // Earth’s mean radius in meter
    var dLat = rad(monstersToRender.latitude() - playerCoords.latitude())
    var dLong = rad(monstersToRender.longitude() - playerCoords.longitude())
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(playerCoords.latitude())) * Math.cos(rad(monstersToRender.latitude())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
      return d; // returns the distance in meter
    }
    console.log(d)
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
    enableHighAccuracy: false
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
