import React, { Component } from 'react'
import {Form, FormGroup, Label, Input, Col, Button} from 'reactstrap'
import axios from 'axios'

export default class SignUpComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      team: ''

    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    // get our form data out of state
    const { username, password, email, team } = this.state

    axios.post('http://localhost:5000/api/users', { username, password, email, team })
      .then((result) => {
        // access the results here....
      })
  }

  render () {
    const { username, password, email, team } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup row>
          <Label for="Email" sm={4}>Email</Label>
          <Col sm={8}>
            <Input type="email" name="email" value={email} onChange={this.onChange} id="email" placeholder="Your email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="username" sm={4}>Username</Label>
          <Col sm={8}>
            <Input type="username" name="username" value={username} onChange={this.onChange} id="username" placeholder="Ex: 'BootyWarrior'" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Password" sm={4}>Password</Label>
          <Col sm={8}>
            <Input type="password" name="password" value={password} onChange={this.onChange} id="password" placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="RePassword" sm={4}>Re-Enter Password</Label>
          <Col sm={8}>
            <Input type="password" name="password" id="password" placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="checkbox2" sm={4}></Label>
          <Col sm={{ size: 8 }}>
            <FormGroup check>
              <Label check>
                <Input color="danger" type="checkbox" id="checkbox2" />{'Team Red'}
                <br />
                <Input color="primary" type="checkbox" id="checkbox2" />{'Team Blue'}
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup>
          <Button color="primary">Sign up</Button>
        </FormGroup>
      </Form>
    )
  }
}
