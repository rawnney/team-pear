// @flow

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import PropTypes from 'prop-types'
import MyMarker from './MyMarker'

class MapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: undefined,
      lng: undefined
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
  // return nextProps.coords.lat !== this.coords.lat || nextProps.coords.lng !== this.coords.lng
    return true
  }

  componentWillUpdate () {
  }

  componentDidUpdate () {

  }

  render () {
    let {coords, isGeolocationAvailable, isGeolocationEnabled} = this.props
    if (!isGeolocationAvailable) return <div style={styles.infoMsg}>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) { /* handle error */ }
    if (!coords) return <div style={styles.infoMsg}>Getting the location data&hellip; </div>
    return <div className="gmap">
      <MyMarker
        lng={coords.longitude}
        lat={coords.latitude}
        accuracy={coords.accuracy}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div className="bgmap" style={styles.mapStyle} />}
        containerElement={<div className="bgmap" style={styles.mapStyle} />}
        mapElement={<div className="bgmap" style={styles.mapStyle} />} />
    </div>
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(MapView)

let styles = {
  mapStyle: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: -1000
  },
  infoMsg: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center'
  }
}
