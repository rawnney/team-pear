import React, { Component } from 'react'

import { Button } from 'reactstrap'
import Map from './map'
import './index.css'
import Char from './characterpage.js'
class App extends Component {
  render () {
    return (
      <div className="App">
        <Map/>
        <Char/>
      </div>
    )
  }
}

export default App
