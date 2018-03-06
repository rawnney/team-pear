import React, {Component} from 'react'
import Images from '../libs/Imgs'
let {WereWolf, KillIcon, Avatar1} = Images

export default class Leaderboard extends Component {
  render () {
    return <div style={styles.wrapper}>
      <h1 style={styles.centerText}>Welcome to Pear Game!</h1>
      <hr />
      <div style={styles.topLeft}>
        <img src={WereWolf} style={styles.pic} alt='Img'/>
      </div>
      <p style={styles.textTopLeft}>Make the world safe again by killing all the monsters.
        Earn coins and quip your character with a variety of items - to boost your ability to survive.</p>
      <div style={styles.middleRight}>
        <img src={KillIcon} style={styles.pic} alt='Img'/>
      </div>
      <p>Challenge your friends! Climb the leaderboard and brag about your accomplishments!</p>
      <div style={styles.lowerLeft}>
        <img src={Avatar1} style={styles.pic} alt='Img'/>
      </div>
      <p>Make friends in the global chatroom and help each other to find all the secrets the game has to offer!</p>
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
    alignSelf: 'center',
    justifyContent: 'center'
  },
  lowerLeft: {
    alignSelf: 'flex-end',
    justifyContent: 'right'
  },
  textTopLeft: {
  },
  pic: {
    height: '40px',
    weight: '40px'
  }
}
