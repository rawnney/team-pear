import React, { Component } from 'react'

export default class MyAccount extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.props = {
      AccName: String,
      FirstName: String,
      LastName: String,
      Email: String
    }
  }

  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h3>My Account</h3>
        <ul style={{listStyle: 'none'}}>
          <li AccName='Account Name Example'/>
          <li FirstName='Ragnar'/>
          <li LastName='Lodbrok'/>
          <li Email='Email@email.com'/>
        </ul>
      </div>
    )
  }
}
