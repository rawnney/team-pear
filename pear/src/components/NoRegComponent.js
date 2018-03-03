import React, { Component } from 'react'
import {Label, FormGroup, Input, Col, Button, Form} from 'reactstrap'
import {capitalizeFirstLetter} from '../libs/Common'

export default class NoRegComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        iduser: null,
        email: null,
        password: null,
        username: null,
        team: '',
        monstersKilled: 0,
        coins: 0,
        reg: 'false',
        avatar: 'Avatar1',
        attack: 0,
        block: 0,
        head: 100,
        weapon: 101,
        chest: 102,
        shield: 103,
        legs: 104,
        feet: 105
      }
    }
  }

  handleSignIn = (e) => {
    e.preventDefault()
    let {user} = this.state
    let {onSignIn} = this.props
    this.setState({user: {...user, username: this.state.username}})
    if (onSignIn) onSignIn(user)
  }

  handleUsername = (name) => {
    let {user} = this.state
    this.setState({user: {...user, username: capitalizeFirstLetter(name.target.value)}})
  }

  render () {
    let {username} = this.state
    return (
      <Form onSubmit={this.handleSignIn}>
        <FormGroup row>
          <Label for="username" sm={4}>Username</Label>
          <Col sm={8}>
            <Input type="text" onChange={this.handleUsername} value={username} placeholder="Your Username" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Button color="success" type="submit">Sign in</Button>
        </FormGroup>
      </Form>
    )
  }
}
