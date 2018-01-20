import React from 'react'
import {geolocated} from 'react-geolocated'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import Marker from './Marker'

class Demo extends React.Component {
  innerRef
  constructor (props) {
    super(props)
    this.state = {
      lat: undefined,
      lng: undefined
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.getLocation()
    }, 5000)
  }

  shouldComponentUpdate (nextProps, nextState) {
  // return nextProps.coords.lat !== this.coords.lat || nextProps.coords.lng !== this.coords.lng
    return true
  }

  componentWillUpdate () {
  }

  componentDidUpdate () {

  }

  render () {
    let {coords, isGeolocationAvailable, isGeolocationEnabled} = this.props
    if (!isGeolocationAvailable) return <div>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) return <div>Geolocation is not enabled</div>
    if (!coords) return <div>Getting the location data&hellip; </div>
    return <div className="gmap">
      <Marker
        ref={this.setRef}
        lng={coords.longitude}
        lat={coords.latitude}
        accuracy={coords.accuracy}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div className="bgmap" style={styles.mapStyle} />}
        containerElement={<div className="bgmap" style={styles.mapStyle} />}
        mapElement={<div className="bgmap" style={styles.mapStyle} />} />
    </div>
  }

  getLocation = () => {
    if (!this.innerRef) return
    let a = this.innerRef.getLocation()
  }

  setRef = (ref: *) => {
    this.innerRef = ref
  }
}

let styles = {
  mapStyle: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: -1000
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Demo)

//
// class Demo extends React.Component {
//   render () {
//     return !this.props.isGeolocationAvailable
//       ? <div>Your browser does not support Geolocation</div>
//       : !this.props.isGeolocationEnabled
//         ? <div>Geolocation is not enabled</div>
//         : this.props.coords
//           ? <table>
//             <tbody>
//               <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
//               <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
//             </tbody>
//           </table>
//           : <div>Getting the location data&hellip; </div>
//   }
// }
