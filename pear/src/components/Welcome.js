import React, { Component } from 'react'
import {Button} from 'reactstrap'

export default class Welcome extends Component {
  render () {
    return <div>
      <h3>Welcome {this.props.user}!</h3>
      <Button style={styles.button} onClick={this.props.goToGame} color="success">Play</Button>
      <Button style={styles.button} onClick={this.props.signOut} color="danger">Sign out</Button>
    </div>
  }
}

let styles = {
  button: {
    margin: '10px',
    width: '200px'
  }
}
