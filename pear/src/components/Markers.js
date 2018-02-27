import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
//import FightView from './FightView'
import mapOptions from '../assets/json/skin'

const MARKERS = withScriptjs(withGoogleMap(props => {
  let {lng, lat, markers} = props
  // console.log(lat,lng, )

  var distanceCheack;
    if (d => 10){
      distanceCheack: () => onClick(index, props);
    }else{
      distanceCheack: null;
    }


  return <GoogleMap defaultZoom={18} defaultOptions={{scrollwheel: false}} options={mapOptions} defaultCenter={{lat, lng}}>
    {<Marker position={{lat, lng}} />}

    {markers.map((marker, index) => (
      <Marker key={index} position={{lat: marker.latitude, lng: marker.longitude}} icon={marker.icon} clickable onClick={distanceCheack} />
    ))}

  </GoogleMap>
  }
  ))

  export let onClick = (id: number, props: Object) => {
    console.warn('MONSTER PRESS ID: ' + id)
    props.toggleFightView(id)
  }

  export default MARKERS

// 59.312963, 18.109775 icon={markers[index].icon}
