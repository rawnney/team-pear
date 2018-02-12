
import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import Home from './Home'
import LoginForm from './LoginForm'
import Images from '../libs/Imgs'
import fakeServerData from '../fakeServerData'
let {Pear} = Images


// get user som props

export default class GameView extends Component<Props, State> {
  // onödig constructor
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
    }
  }

  render () {
    let {loggedIn, user} = this.state
    let notLoggedIn = <Home {...this.state} getUser={this.getUser} setLoggedIn={this.setLoggedIn}/>
    if (!loggedIn) return notLoggedIn
    return <div>
      <CharacterView
        getUser={this.getUser}
        signOut={this.signOut}
      />
      <MapView resetFight={this.resetFight}

      />
    </div>
  }

  resetFight = (monstersKilled, coins) => {
    this.setState({monstersKilled, coins: coins + 2})
  }

  setLoggedIn = (loggedIn) => {
    this.setState({loggedIn: true})
  }

  signOut = () => {
    this.setState({loggedIn: false, user: null})
  }

  getUser = (user) => {
    this.setState({user})
  }

}
//
// myCallback = (dataFromChild) => {
//   let {response} = this.state
//   let clear = null
//   if (response === null || response !== dataFromChild) return this.setState({response: dataFromChild})
//   if (response === dataFromChild) return this.setState({response: clear})
// }
