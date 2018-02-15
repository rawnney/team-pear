import React, {Component} from 'react'
// eslint-disable-next-line
import {Col, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios'
import fakeServerData from '../fakeServerData'

const API_SIGNIN = 'http://localhost:5000/api/signin'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {user: {}}
  }

  handleSignIn = (e) => {
    e.preventDefault()
    let {onSignIn} = this.props
    const {username, password} = this.state.user
    axios.post(API_SIGNIN, {username, password})
      .then((result) => {
        const user = result.data.user
        this.setState({user: user})
        if (onSignIn) onSignIn(user)
      })
  }

  handleUsername = (name) => {
    let {user} = this.state
    this.setState({user: {...user, username: name.target.value}})
  }

  handlePassword = (pass) => {
    let {user} = this.state
    this.setState({user: {...user, password: pass.target.value}})
  }

  render () {
    let {username, password} = this.state
    return (
      <Form onSubmit={this.handleSignIn}>
        <FormGroup row>
          <Label for="username" sm={4}>Username</Label>
          <Col sm={8}>
            <Input type="text" onChange={this.handleUsername} value={username} placeholder="Your Username" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Password" sm={4}>Password</Label>
          <Col sm={8}>
            <Input type="password" onChange={this.handlePassword} value={password} placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Button color="success" type="submit">Sign in</Button>
        </FormGroup>
      </Form>
    )
  }
}
