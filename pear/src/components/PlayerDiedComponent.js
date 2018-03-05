import React, { Component } from 'react'
import Images from '../libs/Imgs'
let {KillIcon} = Images

export default class PlayerDiedComponent extends Component {
  render () {
    return (
      <div style={styles.center}>
        <img src={KillIcon} style={styles.KillIcon} alt='Coins'/>
        <p style={styles.looserText}>You are dead.</p>
        <p style={styles.coinLoss}>You loose {this.props.goldLoss} coins!</p>
      </div>
    )
  }
}

let styles = {
  coin: {
    height: '25px',
    width: '25px'
  },
  center: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  looserText: {
    fontSize: '20px',
    fontWeight: 600
  },
  coinLoss: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'red'
  },
  KillIcon: {
    height: '100px',
    width: '100px',
    alignSelf: 'center',
    padding: '10px'
  }
}
