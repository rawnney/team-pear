import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'
import React, { Component } from 'react'

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 59.334591, lng: 18.063240 }}
  >
    <Marker
      position={{ lat: 59.334591, lng: 18.063240 }}
    />
  </GoogleMap>
))

export default class Map extends Component {
  render () {
    return (
      <div className="Gmap">

        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={styles.containerEle} className="containerElement"/>}
          containerElement={<div style={styles.containerEle} className="containerElement"/>}
          mapElement={<div style={styles.containerEle} className="containerElement"/>}
        />
      </div>
    )
  }
}

let styles = {
  containerEle: {
    width: '100%',
    height: '100%'
  }
}
