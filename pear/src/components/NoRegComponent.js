import React, { Component } from 'react'
import {Label, FormGroup, Input, Col, Button, Form} from 'reactstrap'
import fakeServerData from '../fakeServerData'

export default class NoRegComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: fakeServerData.users[0]
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
    this.setState({user: {...user, username: name.target.value}})
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
