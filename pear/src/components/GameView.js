import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import FightView from './FightView'
import { Button, Modal } from 'reactstrap'
import Home from './Home'
import Welcome from './Welcome'

export default class GameView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      loggedIn: false,
      modal: false
    }
  }

  componentDidMount () {
    { /* getUser(userName, pass).then(() => {
      this.setState({user})
    }) */ }
    this.setState()

  componentWillMount () {}

  render () {
    let Auth = <div><Button onClick={() => this.signIn()}>LOGININ-TEST</Button></div>
    let {togglemod} = this.props
    let {loggedIn, modal, user} = this.state
    // let {user} = this.state
    if (loggedIn === false) return Auth
    return (
      <div>
        <h1>{this.user}</h1>
        <Button onClick={this.togglemod} style={{width: '10%', position: 'relative'}}>LOGIN</Button>
        {Modal ? <Modal isOpen={modal} togglemod={this.togglemod}>
          <Home />
        </Modal> : <div />}
        <CharacterView /> {/* user={user} */}
        <MapView />
        {/*  <Button onClick={this.togglemod} style={{width: '10%', position: 'absolute'}}>FIGHTVIEW</Button>
        {modal ? <Modal isOpen={modal} togglemod={this.togglemod}>
          <FightView />
        </Modal> : <div />} */}
      </div>
    )
  }

  togglemod = () => this.setState({modal: !this.state.modal})

  signIn (username, password) {
    // This is where you would call Firebase, an API etc...
    // calling setState will re-render the entire app (efficiently!)
    this.setState({
      loggedIn: true,
      user: {
        username,
        password
      }
    })
  }

  signOut () {
    // clear out user from state
    this.setState({user: null})
  }
}
