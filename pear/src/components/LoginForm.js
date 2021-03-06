import React, {Component} from 'react'
// eslint-disable-next-line
import {Col, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios'
import {capitalizeFirstLetter} from '../libs/Common'
import Loader from './Loader'
import {API_SIGNIN} from '../libs/Const'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      loginError: false
    }
  }

  render () {
    let {username, password, loginError, loading} = this.state
    return (
      <Form onSubmit={this.handleSignIn}>
        <FormGroup row>
          <Label for="Username" sm={4}>Username</Label>
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
          {loading ? this.renderLoading() : <div />}
          <Button color="success" type="submit">Sign in</Button>
        </FormGroup>
      </Form>
    )
  }

  handleSignIn = (e) => {
    e.preventDefault()
    let {user} = this.state
    let {username, password} = user
    this.setState({loading: true})
    let {onSignIn} = this.props
    // const {username, password} = this.state.user
    axios.post(API_SIGNIN, {username, password})
      .then((result) => {
        let user = result.data.user
        let error = result.data.Error
        if (error === true) return this.setState({loginError: true, loading: false})
        if (error === false) this.setState({user: {...user}, loading: false})
        if (onSignIn) onSignIn(user)
      })
  }

  handleUsername = (username) => {
    let {user} = this.state
    this.setState({user: {...user, username: capitalizeFirstLetter(username.target.value)}})
  }

  handlePassword = (pass) => {
    let {user} = this.state
    this.setState({user: {...user, password: pass.target.value}})
  }

  renderLoading = () => {
    return <Loader />
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
