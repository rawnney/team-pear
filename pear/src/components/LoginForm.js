import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

export default class LoginForm extends Component {
  // Using a class based component here because we're accessing DOM refs

  handleSignIn = (e) => {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.onSignIn(username, password)
  }

  render () {
    return (
      <form onSubmit={this.handleSignIn}>
        <h3>Sign in</h3>
        <FormGroup row>
          <Label for="username" sm={4}>Username</Label>
          <Col sm={8}>
            <Input type="username" name="username" ref="username" id="username" placeholder="Your Username" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Password" sm={4}>Password</Label>
          <Col sm={8}>
            <Input type="password" name="password" ref="password" id="password" placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10 }} style={{display: 'flex', textAlign: 'center'}}>
            <Button color="success" type="submit">Submit</Button>
          </Col>
        </FormGroup>
      </form>
    )
  }
}
