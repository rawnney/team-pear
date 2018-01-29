import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class FightButton extends Component {
  render () {
    return <Button onClick={this.props.onClick}>
      {this.props.text}
    </Button>
  }
}
