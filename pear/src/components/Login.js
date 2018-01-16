// @flow
/* eslint-disable default-case */
import React, { Component } from 'react'
import { Button } from 'reactstrap'

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'

export default class Login extends Component {
  state = {type: LOGIN}
  render () {
    let {type} = this.state
    return (
      <div className="loginWrapper">
        {type === LOGIN ? this.renderLogin() : this.renderRegister()}
        <Button onClick={() => this.changeType()}>{type === LOGIN ? 'REGISTER' : 'LOGIN'}</Button>
      </div>
    )
  }

  changeType = () => {
    let {type} = this.state
    switch (type) {
      case LOGIN: return this.setState({type: REGISTER})
      case REGISTER: return this.setState({type: LOGIN})
    }
  }

  renderRegister () {
    return <div className='inputWrapper'>
      <h1>REGISTER</h1>
      <input placeholder='NAME' />
      <input placeholder='PASS' />
      <input placeholder='EMAIL' />
      <input type='submit' />
    </div>
  }

  renderLogin () {
    return <div className='inputWrapper'>
      <h1>LOGIN</h1>
      <input placeholder='NAME' />
      <input placeholder='PASS' />
      <input type='submit' />
    </div>
  }
}
