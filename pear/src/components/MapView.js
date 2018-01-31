// @flow
import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import MARKERS from './Markers'
import Images from '../libs/Imgs'
let {Monster} = Images

type Props = {
  coords: Object,
  isGeolocationAvailable: boolean,
  isGeolocationEnabled: boolean
}
type State = {
  monsterMarkers: Array<*>,
  didSetMonsters: boolean
}
class MapView extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      monsterMarkers: [],
      didSetMonsters: false
    }
  }

  componentDidMount () {}

  // shouldComponentUpdate (nextProps, nextState) {
  // return nextProps.coords.lat !== this.coords.lat || nextProps.coords.lng !== this.coords.lng
  // }

  componentWillUpdate (nextProps, nextState) {
    this.setMonsters(nextProps, nextState)
  }

  componentDidUpdate () {}

  render () {
    let {coords, isGeolocationAvailable, isGeolocationEnabled} = this.props
    let {monsterMarkers} = this.state
    if (!isGeolocationAvailable) return <div style={styles.infoMsg}>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) { /* handle error */ }
    if (!coords) return <div style={styles.infoMsg}>Getting the location data&hellip; </div>
    return <div className="gmap">
      <MARKERS
        lng={coords.longitude}
        lat={coords.latitude}
        accuracy={coords.accuracy}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCerbPPD0V2qOoQC1QJbNSlxfUWsxYAmo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={styles.mapStyle} />}
        containerElement={<div style={styles.mapStyle} />}
        mapElement={<div style={styles.mapStyle} />}
        markers={monsterMarkers}
      />
    </div>
  }

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
  }
}
