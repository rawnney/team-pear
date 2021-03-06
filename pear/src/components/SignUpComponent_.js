import React, {Component} from 'react'
// eslint-disable-next-line
import {Form, FormGroup,FormText, Label, Input, Col, Button} from 'reactstrap'
import axios from 'axios'
import {capitalizeFirstLetter} from '../libs/Common'
import {API_USERS} from '../libs/Const'
import Images from '../libs/Imgs'

let {Avatar1, Avatar2, Avatar3, Avatar4} = Images

export default class SignUpComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {user: {}}
  }

  handleUsername = (username) => {
    let {user} = this.state
    this.setState({user: {...user, username: capitalizeFirstLetter(username.target.value)}})
  }

  handleEmail = (email) => {
    let {user} = this.state
    this.setState({user: {...user, email: email.target.value}})
  }

  handlePassword = (password) => {
    let {user} = this.state
    this.setState({user: {...user, password: password.target.value}})
  }

  handelSelectTeam=(selectTeam) => {
    let {user} = this.state
    this.setState({user: {...user, team_id: selectTeam.target.value}})
  }
  handelAvatar = (avatar) => {
    console.log(avatar.target.value)
    let {user} = this.state
    this.setState({user: {...user, avatar: avatar.target.value}})
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
    const { username, password, email, avatar, team_id } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup row>
          <Label for="username" sm={4}>Username</Label>
          <Col sm={8}>
            <Input type="username" name="username" value={username} onChange={this.handleUsername} id="username" placeholder="Ex: 'BootyWarrior'" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Email" sm={4}>Email</Label>
          <Col sm={8}>
            <Input type="email" name="email" value={email} onChange={this.handleEmail} id="email" placeholder="Your email" />
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
            <Input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="avatar" sm={4}>Choose Avatar</Label>
          <Col sm={{ size: 8 }}>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="avatar" value="Avatar1" onClick={this.handelAvatar}/>{' '}
                <img style={styles.avatar} src={Avatar1} alt='Avatar1'/>
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="avatar" value="Avatar2" onClick={this.handelAvatar} />{' '}
                <img style={styles.avatar} src={Avatar2} alt='Avatar2'/>
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="avatar" value="Avatar3" onClick={this.handelAvatar} />{' '}
                <img style={styles.avatar} src={Avatar3} alt='Avatar3'/>
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="avatar" value="Avatar4" onClick={this.handelAvatar} />{' '}
                <img style={styles.avatar} src={Avatar4} alt='Avatar4'/>
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="selectTeam" sm={4}>Choose Team</Label>
          <Col sm={{ size: 8 }}>
            <FormGroup>
              <Input type="select" name="selectTeam" id="selectTeam" onChange={this.handelSelectTeam}>
                <option value='1'>Red</option>
                <option value='2'>Green</option>
                <option value='3'>Blue</option>
              </Input>
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

let styles = {
  avatar: {
    height: '150px'
  }
}
