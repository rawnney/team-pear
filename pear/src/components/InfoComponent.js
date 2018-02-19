import React, {Component} from 'react'

export default class Leaderboard extends Component {
  render () {
    return <div style={styles.infoText}>
      <h1>Welcome to Pear Game!</h1>
    </div>
  }
}

let styles = {
  infoText: {
    display: 'flex',
    justifyContent: 'center'
  }
}
