// @flow
import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import {Modal, Button} from 'reactstrap'
import Markers from './Markers'
import Images from '../libs/Imgs'
import FightView from './FightView'
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
}
class MapView extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      monsterMarkers: [],
      didSetMonsters: false,
      fightViewOpened: false,
    }
  }

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {
    this.setMonsters(nextProps, nextState)
  }

  render () {
    let {monsterMarkers, fightViewOpened} = this.state
    let {coords, isGeolocationAvailable, isGeolocationEnabled} = this.props
    if (!isGeolocationAvailable) return <div style={styles.infoMsg}>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) { /* handle error */ }
    if (!coords) return <div style={styles.infoMsg}>Getting the location data&hellip; </div>
    return <div className="gmap">
      <Markers
        lng={coords.longitude}
        lat={coords.latitude}
        openFightView={this.openFightView}
        accuracy={coords.accuracy}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCerbPPD0V2qOoQC1QJbNSlxfUWsxYAmo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={styles.mapStyle} />}
        containerElement={<div style={styles.mapStyle} />}
        mapElement={<div style={styles.mapStyle} />}
        markers={monsterMarkers}
      />
      <Modal isOpen={fightViewOpened} togglemod={this.openFightView}>
        <Button onClick={this.closeFightView} style={styles.closeButton}>X</Button>
        <FightView {...this.state}/>
      </Modal>
    </div>
  }

  closeFightView = () => this.setState({fightViewOpened: false})
  openFightView = () => this.setState({fightViewOpened: true})

  setMonsters (nextProps, nextState) {
    let {latitude, longitude} = nextProps.coords
    let {monsterMarkers, didSetMonsters} = nextState
    if (!latitude || !longitude) return
    if (latitude === null || longitude === null) return
    if (didSetMonsters) return
    let monsterCount = 5
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
    alignSelf: 'center'
  },
  closeButton: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginLeft: '20px'
  }
}
