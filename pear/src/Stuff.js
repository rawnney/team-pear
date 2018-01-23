import React, { Component } from 'react'
import styled from 'styled-components'

const Image = styled.img`
 height: '100%'
 `

class Stuff extends Component {
  render () {
    return (
      <div>
        <div class="row">
          <div class="col-sm-6 col-md-4"><Image src={ require('./assets/img/map.gif')} alt="map"/></div>
          <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
              {/* <img src={ require('./assets/img/map.gif')} alt="map"/> */}
              <div class="caption">
                <h2>Game info</h2>
                <p>This is a web based game. This page contains all of our rules.</p>
                <h3>Game Rules</h3>
                <p>Mauris sem velit, vehicula eget sodales vitae,
                rhoncus eget sapien:</p>
                <ol>
                  <li>Nulla pulvinar diam</li>
                  <li>Facilisis bibendum</li>
                  <li>Vestibulum vulputate</li>
                  <li>Eget erat</li>
                  <li>Id porttitor</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4"></div>
        </div>
      </div>
    )
  }
}

export default Stuff
