import React, { Component } from 'react'
import Welcome from './Components/Welcome'
import { Button } from 'reactstrap'
import Nav from './Components/Nav'
import './assets/css/main.css'

export default class App extends Component {
  render () {
    return (
      <div className="App">
        <Nav />
        <Welcome />

      </div>
    )
  }
}
