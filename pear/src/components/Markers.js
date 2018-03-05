/* eslint-disable */
import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import mapOptions from '../assets/json/skin'

const MARKERS = withScriptjs(withGoogleMap(props => {

  let {lng, lat, markers} = props
  return <GoogleMap defaultZoom={18} defaultOptions={{scrollwheel: false}} options={mapOptions} defaultCenter={{lat, lng}}>
    {<Marker position={{lat, lng}} />}
    {markers.map(function(marker, index) {
    if (marker.alive === true) return <Marker key={index} position={{lat: marker.latitude, lng: marker.longitude}} icon={marker.icon} clickable onClick={() => onClick(marker.id, props)} />
    }
  )}

  </GoogleMap>
  }
  ))

  export let onClick = (id: number, props: Object) => {
    console.warn('MONSTER PRESS ID: ' + id)
    //let currMonster = props.markers[id]
    let monsterLL = new google.maps.LatLng(props.markers[id].latitude, props.markers[id].longitude)
    let playerLL = new google.maps.LatLng(props.lat, props.lng)

    //console.log("props: ", props.lng + ", " + props.lat, " :" + currMonster.longitude + ", " + currMonster.latitude)
    let dist = google.maps.geometry.spherical.computeDistanceBetween(monsterLL, playerLL)
      if (dist <= 15) {
      props.toggleFightView(id)
      }
  }

export default MARKERS
