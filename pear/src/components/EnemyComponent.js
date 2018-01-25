// @ flow
import React, { Component } from 'react'
import Avatar from './Avatar'
import Monster from '../assets/img/icons/monster-icon.png'

export default class EnemyComponent extends Component {
  render () {
    return (
      <div className='EnemyWrapper'style={styles.wrapper}>
        <Avatar pic={Monster} />
        <h3> {this.props.name} </h3>
        <h3> {this.props.enemyHP} / 100 </h3>
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
  }
}
