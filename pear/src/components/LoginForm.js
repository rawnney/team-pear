import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import fakeServerData from '../fakeServerData'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: fakeServerData.users[0]
    }
  }

  // check = (item, index) => {
  //   for (var key in item) {
  //     console.log(item[key])
  //   }
  // }

  // check = (item, index) => {
  //   let {user, username, password} = this.state
  //   user.forEach((username, password) => {
  //     if (user[index].username === user[index].password) return console.log(username, password)
  //   })
  // }

  // this.check()
  //  if (username === null || password === null) return

  // validateLoginIn = () => {
  //   if () return
  // }

  handleSignIn = (e) => {
    e.preventDefault()
    let {user} = this.state
    let {onSignIn} = this.props
    // this.validateLoginIn(password, username)
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
