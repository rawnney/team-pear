
import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import {Modal, Button} from 'reactstrap'
import fakeServerData from '../fakeServerData'
import EnemyComponent from './EnemyComponent'
import Pinjump from './Pinjump';
import Markers from './Markers'
import Images from '../libs/Imgs'
import FightView from './FightView'
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
      enemyHP: 10,
      playerHP: 100,
      monsterCount: fakeServerData.monster.length,
      monstersKilled: 0
    }
  }

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {
    this.setMonsters(nextProps, nextState)
  }

  render () {
    let {monsterMarkers, fightViewOpened, winnerIsSet, enemyHP, playerHP, activeMonsterName, activeMonsterAvatar, user} = this.state
    let {coords, isGeolocationAvailable, isGeolocationEnabled} = this.props
    if (!!user) return <div/>
    if (!isGeolocationAvailable) return <div style={styles.infoMsg}>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) return <div style={styles.infoMsg}>You must enable Geolocation to play this game!</div>
    if (!coords) return <Pinjump />
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
          {winnerIsSet ? this.renderWinner() : <div />}
          <PlayerComponent playerHP={playerHP} username={user} avatar={user}/>
          <div style={styles.fightButton}>
            <Button onClick={this.handleClickEvent} color='danger'>Attack</Button>
          </div>
        </div>
      </Modal>
    </div>
  }


  toggleFightView = (id) => {
    let {fightViewOpened} = this.state
    console.log(id);
    if (this.state.enemyHP === 0) {
      // this.setActiveMonsterCoins(id)
      this.killCounter()
      this.incCoins(id)
      this.removeMonster(id)
    return this.setState({fightViewOpened: !fightViewOpened, enemyHP: 100, winnerIsSet: false, })
    } else {
    this.setActiveMonsterName(id)
    this.setActiveMonsterAvatar(id)
    return this.setState({fightViewOpened: !fightViewOpened, activeMonsterName: this.setActiveMonsterName(id), activeMonsterAvatar: this.setActiveMonsterAvatar(id)})
    }
  }

  setActiveMonsterName = (id) => {return fakeServerData.monster[id].name}
  setActiveMonsterAvatar = (id) => {return fakeServerData.monster[id].avatar}
  // setActiveMonsterCoins = (id) => {return fakeServerData.monster[id].coins}

  renderWinner = () => {
    return (
      <WinnerPopUp />
    )
  }

  renderExit = () => {
    return <Button onClick={this.toggleFightView} style={styles.closeButton}>X</Button>
  }

  handleClickEvent = () => {
    let {enemyHP, playerHP, monstersKilled} = this.state
    if (enemyHP > 0) {
      this.setState({enemyHP: enemyHP - 10}, () => {
        if (enemyHP === 10 || playerHP === 10) {
          this.setState({winnerIsSet: true})
          this.props.resetFight({monstersKilled: monstersKilled + 1})
        }
      })
    }
  }

  killCounter = () => {
    let {monstersKilled} = this.state
    this.setState({monstersKilled: monstersKilled + 1})
  }

  incCoins = (id) => {
    let {coins} = this.state
    this.setState({coins: coins + 2 }) // 1 * id
  }

  removeMonster = (id, latitude, longitude) => {
    let {monsterMarkers, monsterCount} = this.state
      monsterMarkers.splice(id, 1)
    this.setState({monsterMarkers: monsterMarkers, monsterCount: monsterCount -1})
  }

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

    var mapCoordinates = {Coordinates}
    //console.log(mapCoordinates.Coordinates.features);
    var x = [], monstersToRender = [];
    for (var {properties: {Name: n}, geometry: {coordinates: [c, d]}} of mapCoordinates.Coordinates.features) {
      console.log('Name: ' + n + ', Father: ' + c + " " + d);
      let images = QMark //this.randomIcon()
      x.push({name: n, latitude: c, longitude: d, icon: images})

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
  fightButton: {
    width: '20%',
    margin: 'auto'
  },
  winnerText: {
    textAlign: 'center'
  }
}
