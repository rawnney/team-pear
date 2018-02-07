// @flow
import React, { Component } from 'react'
import Avatar from './Avatar'
import Monster from '../assets/img/icons/monster-icon.png'

type Props = {
  name: String,
  enemyHP: Number,
  // avatar: Image
}

export default class EnemyComponent extends Component<Props> {
  render () {
    return (
      <div style={styles.wrapper}>
        <img src={this.props.avatar} style={styles.avatar} alt='Avatar'/>
        <h3> {this.props.name} </h3>
        <h3> {this.props.enemyHP} / 10 </h3>
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
