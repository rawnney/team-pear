import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import FightView from './FightView'

export default class GameView extends Component {
  innerRef
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    { /* getUser(userName, pass).then(() => {
      this.setState({user})
    }) */ }
    { /* setInterval(() => {
      this.getLocation()
    }, 5000) */ }
  }

  // Kör watchPosition istället för denna

  render () {
    // let {user} = this.state
    return (
      <div className='GameView'>
        <CharacterView /> {/* user={user} */}
        <FightView />
        <MapView />
      </div>
    )
  }

  // i mapView ->  ref={this.setRef}

    getLocation = () => {
      if (!this.innerRef || !this.innerRef.getLocation) return
      this.innerRef.getLocation()
    }

    setRef = (ref: *) => {
      this.innerRef = ref
    }
}

// <FightView />
