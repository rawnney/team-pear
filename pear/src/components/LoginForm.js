import React, {Component} from 'react'
// eslint-disable-next-line
import {Col, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios'

const API_SIGNIN = 'http://peargameapi.herokuapp.com/api/signin'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      loginError: false
    }
  }

  render () {
    let {username, password, loginError} = this.state
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
          {loginError ? this.renderLoginError() : <div />}
          <Button color="success" type="submit">Sign in</Button>
        </FormGroup>
      </Form>
    )
  }

  handleSignIn = (e) => {
    e.preventDefault()
    let {onSignIn} = this.props
    const {username, password} = this.state.user
    axios.post(API_SIGNIN, {username, password})
      .then((result) => {
        const user = result.data.user
        const error = result.data.Error
        if (error === true) return this.setState({loginError: true})
        if (error === false) this.setState({user: user})
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

  renderLoginError = () => {
    let {loginError} = this.state
    if (loginError) return <p style={styles.loginError}>Wrong username or password. Please try again. </p>
  }
}

let styles = {
  loginError: {
    fontSize: '20px',
    color: 'red'
  }
}
