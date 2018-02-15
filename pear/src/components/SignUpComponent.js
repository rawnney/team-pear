import React, {Component} from 'react'
// eslint-disable-next-line
import {Form, FormGroup, Label, Input, Col, Button} from 'reactstrap'
import axios from 'axios'

const API_USERS = 'http://peargameapi.herokuapp.com/api/users'

export default class SignUpComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {user: {}}
  }

  handleUsername = (username) => {
    let {user} = this.state
    this.setState({user: {...user, username: username.target.value}})
  }

  handleEmail = (email) => {
    let {user} = this.state
    this.setState({user: {...user, email: email.target.value}})
  }

  handlePassword = (password) => {
    let {user} = this.state
    this.setState({user: {...user, password: password.target.value}})
  }

  onSubmit = (e) => {
    e.preventDefault()
    let {onSignIn} = this.props
    const { username, password, email, team } = this.state.user
    axios.post(API_USERS, { username, password, email, team })
      .then((result) => {
        const user = null
        if (onSignIn) onSignIn(user)
      })
  }

  render () {
    const { username, password, email, team } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup row>
          <Label for="Email" sm={4}>Email</Label>
          <Col sm={8}>
            <Input type="email" name="email" value={email} onChange={this.handleEmail} id="email" placeholder="Your email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="username" sm={4}>Username</Label>
          <Col sm={8}>
            <Input type="username" name="username" value={username} onChange={this.handleUsername} id="username" placeholder="Ex: 'BootyWarrior'" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Password" sm={4}>Password</Label>
          <Col sm={8}>
            <Input type="password" name="password" value={password} onChange={this.handlePassword} id="password" placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="RePassword" sm={4}>Re-Enter Password</Label>
          <Col sm={8}>
            <Input type="password" name="password" id="passwordConfirmation" placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="checkbox2" sm={4}></Label>
          <Col sm={{ size: 8 }}>
            <FormGroup check>
              <Label check>
                <Input color="danger" name="red" type="checkbox" id="red" value={team} />{'Team Red'}
                <br />
                <Input color="primary" name="blue" type="checkbox" id="blue" value={team}/>{'Team Blue'}
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
