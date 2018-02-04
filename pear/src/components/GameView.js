// @flow
import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import FightView from './FightView'
import { Button, Modal } from 'reactstrap'
import Home from './Home'
import Welcome from './Welcome'
import Database from '../Database'
import LoginForm from './LoginForm'
import Images from '../libs/Imgs'
let {Pear} = Images

export default class GameView extends Component<Props, State> {
  // onödig constructor
  constructor (props) {
    super(props)
    this.state = {
      user: undefined,
      loggedIn: false,
      modal: false
    }
  }

  render () {
    let {signOut} = this.props
    let notLoggedIn = <Home {...this.state} setLoggedIn={() => this.setState({loggedIn: true})} />
    let {togglemod} = this.props
    let {loggedIn, modal, user} = this.state
    if (loggedIn === false) return notLoggedIn
    return <div>
      <CharacterView {...this.state}/>
      <MapView {...this.state}/>
    </div>
  }

  togglemod = () => this.setState({modal: !this.state.modal})

  signIn = (username, password) => {
    this.setState({loggedIn: true, user: {username, password}})
  }

  signOut = () => {
    this.setState({loggedIn: false, user: null})
  }
}
