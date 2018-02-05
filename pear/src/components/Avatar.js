// @ flow
import React, { Component } from 'react'

export default class Avatar extends Component {
  render () {
    return <img src={this.props.pic} style={styles.avatar} alt='Avatar'/>
  }
}

let styles = {
  avatar: {
    height: '50px',
    width: '50px',
    borderRadius: '50%'
  }
}
