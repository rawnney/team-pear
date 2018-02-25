import React, {Component} from 'react'
// eslint-disable-next-line
import {Form, FormGroup,FormText, Label, Input, Col, Button} from 'reactstrap'
import axios from 'axios'
import {capitalizeFirstLetter, validateEmail} from '../libs/Common'
import Images from '../libs/Imgs'
import Loader from './Loader'

let {Avatar1, Avatar2, Avatar3, Avatar4} = Images

const API_USERS = 'http://peargameapi.herokuapp.com/api/users/'

export default class SignUpComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signUpError: false,
      user: {
        reg: 'true',
        monstersKilled: 0,
        coins: 0,
        attack: 0,
        block: 0,
        team: 'none'
      }
    }
  }

  render () {
    let {username, password, email, loading, signUpError, rePassword} = this.state
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
            <Input type="password" name="rePassword" value={rePassword} onChange={this.handleRePassword} id="passwordConfirmation" placeholder="*******" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="avatar" sm={4}>Choose Avatar</Label>
          <Col sm={{ size: 8 }} style={styles.avatarWrapper}>
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
                <option value='none'> -- Select team -- </option>
                <option value='RED'>Red</option>
                <option value='GREEN'>Green</option>
                <option value='BLUE'>Blue</option>
              </Input>
            </FormGroup>
          </Col>
        </FormGroup>

        <FormGroup>
          {signUpError ? this.renderSignUpError() : <div />}
          {loading ? this.renderLoading() : <div />}
          <Button color="primary">Sign up</Button>
        </FormGroup>
      </Form>
    )
  }

  onSubmit = (e) => {
    e.preventDefault()
    let {onSignIn} = this.props
    let {user} = this.state
    let {username, password, rePassword, email, avatar, team, reg, monstersKilled, coins, attack, block} = user
    if (!username || !password || !email || !avatar || !team) return this.setState({signUpError: true})
    if (!username || username.length < 3) return this.setState({signUpError: true, errorMsg: 'Invalid username input, make sure its 3 characters or longer'})
    if (!password || password.length < 5) return this.setState({signUpError: true, errorMsg: 'Invalid password input, make sure its 5 characters or longer'})
    if (password !== rePassword) return this.setState({signUpError: true, errorMsg: 'The passwords did not match'})
    if (!email || validateEmail(email) === false) return this.setState({signUpError: true, errorMsg: 'That is one wierd email-adress.'})
    if (!avatar) return this.setState({signUpError: true, errorMsg: 'You forgot to select a avatar!'})
    if (!team || team === 'none') return this.setState({signUpError: true, errorMsg: 'Without a team you will never make it in the wild! Please select a team.'})
    this.setState({loading: true})
    axios.post(API_USERS, {username, email, password, avatar, team, reg, monstersKilled, coins, attack, block}).then((result) => {
      const user = null
      if (onSignIn) onSignIn(user)
    }).catch((error) => {
      console.log(error)
    })
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

  handleRePassword = (rePassword) => {
    let {user} = this.state
    this.setState({user: {...user, rePassword: rePassword.target.value}})
  }

  handelSelectTeam = (selectTeam) => {
    let {user} = this.state
    this.setState({user: {...user, team: selectTeam.target.value}})
  }

  handelAvatar = (avatar) => {
    let {user} = this.state
    this.setState({user: {...user, avatar: avatar.target.value}})
  }

  renderLoading = () => {
    return <Loader />
  }

  renderSignUpError = () => {
    let {signUpError, errorMsg} = this.state
    if (signUpError) return <p style={styles.signUpError}>{errorMsg}</p>
  }
}

let styles = {
  avatarWrapper: {
    justifyContent: 'space-around',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  avatar: {
    height: '150px'
  },
  signUpError: {
    fontSize: '20px',
    color: 'red'
  }
}
