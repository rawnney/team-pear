import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import Home from './Home'
// import Images from '../libs/Imgs'
import axios from 'axios'

const API_UPDATE_KILLS = 'http://peargameapi.herokuapp.com/api/update_kills'
const API_UPDATE_COINS = 'http://peargameapi.herokuapp.com/api/update_coins'

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
    let {user: {monstersKilled, coins, iduser}} = this.state
    axios.put(API_UPDATE_KILLS, {monstersKilled, iduser})
    axios.put(API_UPDATE_COINS, {coins, iduser})
    .then((result) => this.setState({loggedIn: false, user: null}))
  }

  setUser = (user) => {
    this.setState({user})
  }

  updateUser = (monstersKilled, coins) => {
    let {user} = this.state
    this.setState({user: {...user, monstersKilled: monstersKilled + 1, coins: coins + 2}})
  }
}
