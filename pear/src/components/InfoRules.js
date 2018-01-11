import React, { Component } from 'react'

export default class InfoRules extends Component {
  render () {
    return (
      <div>
        <p style={styles.info}>Hi and welcome to the most epic game ever! Rule number one - There are no rules </p>
      </div>
    )
  }
}

let styles = {
  info: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: '30px',
    backgroundColor: 'black'
  }
}
