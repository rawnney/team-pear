import React, { Component } from 'react'
import Trophy from './Trophy'
import Images from '../libs/Imgs'

let {CoinStack} = Images

export default class WinnerPopUp extends Component {
  render () {
    return (
      <div style={styles.center}>
        <Trophy />
        <p style={styles.winnerText}>You are victorious!</p>
        <p>You recived {this.props.goldDropped} coins! <img src={CoinStack} style={styles.coin} alt='coin' /></p>
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
  winnerText: {
    fontSize: '20px',
    fontWeight: 600
  }
}
