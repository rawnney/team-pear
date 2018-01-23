import React, { Component } from 'react'
import Welcome from './Welcome'

class Users extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  userList () {
    this.setState({users: [
      {
        id: 1,
        username: 'nasim',
        password: 'nasim',
        email: 'nasim123@gmail.com',
        langutude: '10',
        latitude: '11',
        avatar: ''
      },
      {
        id: 2,
        username: 'hugo',
        password: 'hugo',
        email: 'hugo123@gmail.com',
        langutude: '12',
        latitude: '13',
        avatar: ''
      },
      {
        id: 3,
        username: 'masud',
        password: 'masud',
        email: 'masud123@gmail.com',
        langutude: '14',
        latitude: '15',
        avatar: ''
      }
    ]})
  }
  // login function
  static logIn (key) {
    return key
  }
  // logOut function
  static logOut (key) {
    return key
  }
  // signUp function
  static singUp (key) {
    return key
  }

  render () {
    return (
      <div className="Users">
         users= {this.props.users}
      </div>
    ) // Return tag finished
  }
}

export default Users
