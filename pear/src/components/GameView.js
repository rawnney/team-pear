import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import Home from './Home'
// import Images from '../libs/Imgs'
import axios from 'axios'

const API_UPDATE_KILLS = 'http://peargameapi.herokuapp.com/api/update_kills'
const API_UPDATE_COINS = 'http://peargameapi.herokuapp.com/api/update_coins'

export default class GameView extends Component<Props, State> {
  innerRef
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: undefined
    }
  }

  componentDidMount () {
   setInterval(() => {
    this.getLocation()
    }, 5000)
  }

  render () {
    let {loggedIn, user} = this.state
    let notLoggedIn = <Home setUser={this.setUser} setLoggedIn={this.setLoggedIn}/>
    if (!loggedIn || !user) return notLoggedIn
    return <div>
      <CharacterView
      // TODO: send user back to parent for updating items and coins
        setUser={user}
        signOut={this.signOut}
      />
      <MapView
      ref={this.setRef}
      setUser={user}
      updateUser={this.updateUser}
      />
    </div>
  }

  getLocation = () => {
    if (!this.innerRef || !this.innerRef.getLocation) return
    this.innerRef.getLocation()
  }

  setRef = (ref: *) => {
    this.innerRef = ref
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
