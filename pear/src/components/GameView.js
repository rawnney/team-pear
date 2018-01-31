import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import FightView from './FightView'
import { Button, Modal } from 'reactstrap'

export default class GameView extends Component {
  innerRef
  constructor (props) {
    super(props)
    this.state = {
      modal: false

    }

    this.togglemod = this.togglemod.bind(this)
  }

  componentDidMount () {
    { /* getUser(userName, pass).then(() => {
      this.setState({user})
    }) */ }
    { /* this.setState() */ }
  }

  componentWillMount () {}

  render () {
    let {modal} = this.state
    // let {user} = this.state
    return (
      <div className='GameView'>
        <CharacterView /> {/* user={user} */}
        <MapView />
        <Button onClick={this.togglemod} style={{width: '10%', position: 'absolute'}} className={this.props.className}>FIGHTVIEW</Button>
        {modal ? <Modal isOpen={this.state.modal} togglemod={this.togglemod}>
          <FightView />
        </Modal> : <div />}
      </div>
    )
  }

  togglemod = () => this.setState({modal: !this.state.modal})
}
