import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import React, { Component } from 'react';


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 59.334591, lng: 18.063240 }}
  >
    <Marker
      position={{ lat: 59.334591, lng: 18.063240 }}
    />
  </GoogleMap>
));

class Gmap extends Component {
  render() {
    return (
      <div className="Gmap">

        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div className="containerElement"/>}
          containerElement={<div className="containerElement"/>}
          mapElement={<div className="containerElement"/>}
          />
      </div>
    );
  }
}

export default Gmap;
