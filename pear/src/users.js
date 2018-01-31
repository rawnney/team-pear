class Users {
  constructor (userId, username, email, password, longitude, latitude) {
    this.userId = userId
    this.username = username
    this.email = email
    this.password = password
    this.longitude = longitude
    this.latitude = latitude
  }

  signIn (username, password) {
  // This is where you would call Firebase, an API etc...
  // calling setState will re-render the entire app (efficiently!)
    this.setState({
      user: {
        username,
        password
      }
    })
  }

  signOut () {
  // clear out user from state
    this.setState({user: null})
  }
}
