import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import fakeServerData from '../fakeServerData'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: fakeServerData.user,
      tempUser: {
        tempName: null,
        tempPass: null
      }
      // tempName: null,
      // tempPass: null
      // user: [{
      //   username: null,
      //   password: null
      // }]
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
  handleSignIn = (e) => {
    // e.preventDefault()
    let {tempUser} = this.state
    // this.check()
    //  if (username === null || password === null) return
    this.props.onSignIn(tempUser)
  }

  handleUsername = (name) => {
    let {tempUser: {tempPass}} = this.state
    this.setState({tempUser: {tempName: name.target.value, tempPass}})
  }

  handlePassword = (pass) => {
    let {tempUser: {tempName}} = this.state
    this.setState({tempUser: {tempPass: pass.target.value, tempName}})
  }

  render () {
    let {tempName, tempPass} = this.state
    return (
      <Form onSubmit={this.handleSignIn}>
        <FormGroup row>
          <Label for="username" sm={4}>Username</Label>
          <Col sm={8}>
            <Input type="text" onChange={this.handleUsername} value={tempName} placeholder="Your Username" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Password" sm={4}>Password</Label>
          <Col sm={8}>
            <Input type="password" onChange={this.handlePassword} value={tempPass} placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Button color="success" type="submit">Sign in</Button>
        </FormGroup>
      </Form>
    )
  }
}
