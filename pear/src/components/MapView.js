
import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import {Modal, Button} from 'reactstrap'
import fakeServerData from '../fakeServerData';
import EnemyComponent from './EnemyComponent';
import FightButton from './FightButton';
import Markers from './Markers'
import Images from '../libs/Imgs'
import FightView from './FightView'
import PlayerComponent from './PlayerComponent';
let {Monster} = Images

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
      user: {fakeServerData},
      monsterMarkers: [],
      didSetMonsters: false,
      fightViewOpened: false,
      monsterClose: false,
      winnerIsSet: false,
      enemyHP: 100,
      playerHP: 100

    }
  }

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {
    this.setMonsters(nextProps, nextState)
  }

  render () {
    let {monsterMarkers, fightViewOpened, winnerIsSet, enemyHP, playerHP} = this.state
    let {coords, isGeolocationAvailable, isGeolocationEnabled} = this.props
    if (!isGeolocationAvailable) return <div style={styles.infoMsg}>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) { /* handle error */ }
    if (!coords) return <div tyle={styles.infoMsg}>Getting the location data&hellip; </div>
    return <div>
      <Markers
        lng={coords.longitude}
        lat={coords.latitude}
        toggleFightView={this.toggleFightView}
        removeIfDead={this.removeIfDead}
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
        <EnemyComponent enemyHP={enemyHP} name={'Enemy'}/>
        {winnerIsSet ? this.renderWinner() : <div />}
        <PlayerComponent playerHP={playerHP} name={fakeServerData.user[0].name}/>
        <div style={styles.fightButton}>
          <FightButton onClick={this.handleClickEvent} text={'Attack'} />
        </div>
      </div>
    </Modal>
    </div>
  }

  toggleFightView = () => {
    if (this.state.enemyHP === 0) {
    return this.setState({fightViewOpened: !this.state.fightViewOpened, enemyHP: 100, winnerIsSet: false})
    } else {
    return this.setState({fightViewOpened: !this.state.fightViewOpened})
    }
  }

  checkForWinner = (winnerIsSet, removeIfDead) => {
    if (winnerIsSet === true) return (
      removeIfDead = (index) => {
      this.setState(() => ({
        monsterMarkers: this.monsterMarkers.filter((_, i) => i !== index)
      }))
    })
  }

  renderWinner = () => {
    return <div style={styles.winnerText}>
    YOU ARE WINNER!
    </div>
  }

  renderExit = () => {
    return <Button onClick={this.toggleFightView} style={styles.closeButton}>X</Button>
  }

  handleClickEvent = () => {
    let {enemyHP, playerHP} = this.state
    if (enemyHP > 0) {
      this.setState({enemyHP: enemyHP - 10}, () => {
        if (enemyHP === 10 || playerHP === 10) {
          this.setState({winnerIsSet: true})
          this.props.checkForWinner()
        }
      })
    }
  }

  setMonsters (nextProps, nextState) {
    let {monsterCount} = this.state
    let {latitude, longitude} = nextProps.coords
    let {monsterMarkers, didSetMonsters} = nextState
    if (!latitude || !longitude) return
    if (latitude === null || longitude === null) return
    if (didSetMonsters) return
    let monsters = new Array(monsterCount).fill(0)
    let monstersToRender = []
    monsters.map((item, index) => {
      let coord = this.getMonsterCoord(latitude, longitude, index)
      monstersToRender.push({id: index, latitude: coord.latitude, longitude: coord.longitude, icon: Monster})
    })
    this.setState({monsterMarkers: monstersToRender, didSetMonsters: true})
  }

  getMonsterCoord (latitude, longitude, index) {
    let pos = index * 0.001,
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
