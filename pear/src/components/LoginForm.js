import React, { Component } from 'react'

export default class LoginForm extends Component {
  // Using a class based component here because we're accessing DOM refs

  handleSignIn = (e) => {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.onSignIn(username, password)
    this.closeModal()
  }

  closeModal = () => document.getElementById('close-btn').click()

  render () {
    return (
      <form onSubmit={this.handleSignIn}>
        <h3>Sign in</h3>
        <p>
          <input type="text" ref="username" placeholder="enter you username" />
        </p>
        <p>
          <input type="password" ref="password" placeholder="enter password" />
        </p>
        <p>
          <input type="submit" value="Login" />
        </p>
      </form>
    )
  }
}
