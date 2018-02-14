import React, {Component} from 'react'
// eslint-disable-next-line
import {Col, Button, Form, FormGroup, Label, Input} from 'reactstrap'

// const USERS = 'http://localhost:5000/api/users'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {user: {}}
  }

  handleSignIn = (e) => {
    e.preventDefault()
    let {user} = this.state
    let {onSignIn} = this.props
    this.setState({user})
    if (user) onSignIn(user)
  }

  handleUsername = (name) => {
    this.setState({user: {username: name.target.value}})
  }

  handlePassword = (pass) => {
    this.setState({user: {password: pass.target.value}})
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
