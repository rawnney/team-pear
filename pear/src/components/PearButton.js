import React, { Component } from 'react'
import { Button } from 'reactstrap'

type Props = {
  onClick: Function,
  text: String
}

export default class PearButton extends Component<Props> {
  render () {
    return <Button onClick={this.props.onClick}>{this.props.text}</Button>
  }
}
