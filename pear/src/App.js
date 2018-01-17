import React, { Component } from 'react'
import Welcome from './Components/Welcome'
import { Button } from 'reactstrap'
import Nav from './Components/Nav'
import './assets/css/main.css'

class App extends Component {
  render () {
    return (
      <div>
        <h1>Simple SPA</h1>
        <ul className="header">
          <li><a href="/">Home</a></li>
          <li><a href="/stuff">Stuff</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="content">

        </div>
      </div>
    )
  }
}

export default App
