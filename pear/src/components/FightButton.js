import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class FightButton extends Component {
  render () {
    let {text, onClick} = this.props
    return <Button>
      {this.props.text}
      {this.props.onClick}
    </Button>
  }
}
