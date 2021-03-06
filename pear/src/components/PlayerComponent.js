// @ flow
import React, { Component } from 'react'
// import Avatar from './Avatar'
// import Robin from '../assets/img/icons/robin.png'

export default class PlayerComponent extends Component {
  render () {
    return (
      <div className='PlayerWrapper' style={styles.wrapper}>
        <img src={this.props.avatar} style={styles.avatar} alt='Avatar'/>
        <h3> {this.props.username} </h3>
        <h3> {this.props.playerHP} / 100 </h3>
      </div>
    )
  }
}

let styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '10px'
  },
  avatar: {
    height: '50px',
    width: '50px',
    borderRadius: '50%'
  }
}
