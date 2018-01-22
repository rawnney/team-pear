import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MARKERS = withScriptjs(withGoogleMap(props => {
  let {lng, lat, markers} = props // accuracy
  return <GoogleMap defaultZoom={12} defaultCenter={{lat, lng}}>
    {<Marker position={{lat, lng}} />}
    {markers.map(marker => (
      <Marker position={{ lat: marker.latitude, lng: marker.longitude }}
        icon={marker.icon} />
    ))}
  </GoogleMap>
}
))

export default MARKERS
