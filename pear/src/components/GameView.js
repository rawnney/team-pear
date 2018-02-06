// @flow
import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import Home from './Home'
import LoginForm from './LoginForm'
import Images from '../libs/Imgs'
import fakeServerData from '../fakeServerData'
let {Pear} = Images


export default class GameView extends Component<Props, State> {
  // onödig constructor
  constructor (props) {
    super(props)
    this.state = {
      user: {fakeServerData},
      loggedIn: false,
      winnerIsSet: false
    }
  }

  render () {
    let {signOut} = this.props
    let notLoggedIn = <Home setLoggedIn={() => this.setState({loggedIn: true, user: fakeServerData.user})} />
    let {loggedIn, user} = this.state
    if (loggedIn === false) return notLoggedIn
    return <div>
      <CharacterView
        name={fakeServerData.user[0].name}
        lastname={fakeServerData.user[0].lastname}
        username={fakeServerData.user[0].username}
        email={fakeServerData.user[0].email}

        sword={fakeServerData.user[0].sword}
        blockChance={fakeServerData.user[0].blockChance}
        magic={fakeServerData.user[0].magic}
      />
      <MapView {...this.state} resetFight={() => this.setState({winnerIsSet: true, enemyHP: 100, playerHP: 100})}/>
    </div>
  }

  signOut = () => {
    this.setState({loggedIn: false, user: {}})
  }
}
