import React, { Component } from 'react'
import MapView from './MapView'

export default class GameView extends Component {
  innerRef
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    setInterval(() => {
      this.getLocation()
    }, 5000)
  }

  render () {
    return (
      <div className='GameView'>
        <MapView ref={this.setRef} />
      </div>
    )
  }

    getLocation = () => {
      if (!this.innerRef || !this.innerRef.getLocation) return
      this.innerRef.getLocation()
    }

    setRef = (ref: *) => {
      this.innerRef = ref
    }
}