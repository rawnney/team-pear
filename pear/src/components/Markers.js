import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
//import FightView from './FightView'
import mapOptions from '../assets/json/skin'

const MARKERS = withScriptjs(withGoogleMap(props => {
  let {lng, lat, markers} = props
  console.log(markers)

  return <GoogleMap defaultZoom={18} defaultOptions={{scrollwheel: false}} options={mapOptions} /*styles={{skin}}*/ defaultCenter={{lat, lng}}>
    {<Marker position={{lat, lng}} />}
  {/*{markers.map((markers, id) => (
      <Marker key={id} position={{lat: x[i].latitude, lng: x[i].longitude}} icon={x[i].icon} clickable onClick={() => onClick(marker. id, props)} />
    )}
  )}
    {markers.map((marker, id) => (
      <Marker key{marker.id} position={{lat: x[i].latitude, lng: x[i].longitude}} icon={x[i].icon} clickable onClick={() => onClick(marker. id, props)}/>
    )
    )*/}
    {<Marker position={{lat: 59.312963, lng: 18.109775}} />}
    {markers.map((marker, index) => (
      <Marker key={index} position={{lat: markers.latitude, lng: markers.longitude}} icon={marker.icon} clickable onClick={() => onClick(marker.id, props)} />
    ))}
  </GoogleMap>
  }
  ))

  export let onClick = (id: number, props: Object) => {
    console.warn('MONSTER PRESS ID: ' + id)
    props.toggleFightView(id)
  }

  export default MARKERS

// 59.312963, 18.109775
