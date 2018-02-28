/* eslint-disable */
import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import mapOptions from '../assets/json/skin'

const MARKERS = withScriptjs(withGoogleMap(props => {

  /*var distanceCheack;
    if (d => 10){
      distanceCheack: () => onClick(index, props);
    }else{
      distanceCheack: null;
    }*/

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
    props.toggleFightView(id)
  }


 export default MARKERS

// 59.312963, 18.109775 icon={markers[index].icon}  clickable onClick={distanceCheack}
