
import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import Home from './Home'
import LoginForm from './LoginForm'
import Images from '../libs/Imgs'
import fakeServerData from '../fakeServerData'
let {Pear} = Images

export default class GameView extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: undefined
    }
  }

  render () {
    let {loggedIn, user} = this.state
    let notLoggedIn = <Home setUser={this.setUser} setLoggedIn={this.setLoggedIn}/>
    if (!loggedIn || !user) return notLoggedIn
    return <div>
      <CharacterView
      // TODO: items  // updateUser={this.updateUser}
        setUser={user}
        signOut={this.signOut}
      />
      <MapView
      setUser={user}
      updateUser={this.updateUser}
      />
    </div>
  }

  setLoggedIn = (loggedIn) => {
    this.setState({loggedIn: true})
  }

  signOut = () => {
    // TODO: save user
    this.setState({loggedIn: false, user: null})
  }

  setUser = (user) => {
    this.setState({user})
  }

  updateUser = (monstersKilled, coins) => {
    let {user} = this.state
    this.setState({user: {...user, monstersKilled: monstersKilled + 1, coins: coins + 2}})
  }
}
