
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
      user: null, //{fakeServerData},
      loggedIn: false,

    }
  }

  render () {
    let {monstersKilled, coins, username} = this.state
    let notLoggedIn = <Home setLoggedIn={this.getUser} /> // fakeServerData.user
    let {loggedIn, user} = this.state
    if (loggedIn === false) return notLoggedIn
    return <div>
      <CharacterView
        user={fakeServerData.user[0]}
        signOut={this.signOut}
      />
      <MapView resetFight={(monstersKilled) => this.setState({winnerIsSet: false, enemyHP: 100, playerHP: 100, monstersKilled, coins: coins + 2})}/>
    </div>
  }

  signOut = () => {
    this.setState({loggedIn: false, user: {}})
  }

  getUser = (user) => {
    {(username) => this.setState({loggedIn: true, user: username})}
  }

}
