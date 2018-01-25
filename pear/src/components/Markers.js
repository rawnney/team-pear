import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MARKERS = withScriptjs(withGoogleMap(props => {
  let {lng, lat, markers} = props
  return <GoogleMap defaultZoom={12} defaultCenter={{lat, lng}}>
    {<Marker position={{lat, lng}} />}
    {markers.map((marker, index) => (
      <Marker key={index} position={{lat: marker.latitude, lng: marker.longitude}} icon={marker.icon} clickable onClick={() => onClick(marker.id)} />
    ))}
  </GoogleMap>
}
))

export let onClick = (id: number) => {
  // TODO: puckla på ett monster
  console.warn('MONSTER PRESS ID: ' + id)
}

export default MARKERS
