import React, {Component} from 'react'

export default class Leaderboard extends Component {
  render () {
    return <div style={styles.wrapper}>
      <h1 style={styles.centerText}>Welcome to Pear Game!</h1>
      <hr />
      <h4 style={styles.centerText}> The best MMORPG there is.</h4>
      <hr />
      <div style={styles.topLeft}>
        <img src={{}} alt='Img'/>
        <h4>ipsum</h4>
      </div>
      <div style={styles.middleRight}>
        <img src={{}} alt='Img'/>
        <h4>ipsum</h4>
      </div>
      <div style={styles.lowerLeft}>
        <img src={{}} alt='Img'/>
        <h4>ipsum</h4>
      </div>
    </div>
  }
}

let styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '15px'
  },
  centerText: {
    textAlign: 'center'
  },
  topLeft: {
    alignSelf: 'flex-start'
  },
  middleRight: {
    alignSelf: 'center'
  },
  lowerLeft: {
    alignSelf: 'flex-end'
  }
}
