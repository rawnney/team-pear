import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { geolocated } from 'react-geolocated'
import PropTypes from 'prop-types'


const MyMarker = withScriptjs(withGoogleMap(props => {
  let {lng, lat} = props // accuracy
  return <GoogleMap defaultZoom={17} defaultCenter={{lat, lng}}>
    <Marker position={{lat, lng}}/>
  </GoogleMap>
}
))

export default MyMarker
