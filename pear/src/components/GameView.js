import React, { Component } from 'react'
import MapView from './MapView'

export default class GameView extends Component {
  render () {
    return (
      <div className='GameView'>
        <MapView />
      </div>
    )
  }
}
