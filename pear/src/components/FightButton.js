import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class FightButton extends Component {
  render () {
    return <Button>
      {this.props.text}
      {this.props.onClick}
    </Button>
  }
}
