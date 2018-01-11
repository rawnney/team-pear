import React, { Component } from 'react'
//  import '../assets/css/main.css'

export default class Nav extends Component {
  render () {
    return (
      <div className="Nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </div>
    )
  }
}
