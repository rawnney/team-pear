import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import FightView from './FightView'

const MARKERS = withScriptjs(withGoogleMap(props => {
  let {lng, lat, markers} = props
  return <GoogleMap defaultZoom={12} defaultCenter={{lat, lng}}>
    {<Marker position={{lat, lng}} />}
    {markers.map((marker, index) => (
      <Marker key={index} position={{lat: marker.latitude, lng: marker.longitude}} icon={marker.icon} clickable onClick={() => onClick(marker.id, props)} />
    ))}
  </GoogleMap>
}
))

export let onClick = (id: number, props: Object) => {
  console.warn('MONSTER PRESS ID: ' + id)
  props.openFightView()
}

export default MARKERS
