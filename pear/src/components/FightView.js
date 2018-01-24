// @ flow
import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Avatar from './Avatar'
import Monster from '../assets/img/icons/monster-icon.png'
import Robin from '../assets/img/icons/robin.png'
import FightButton from './FightButton'
// import Imgs, { Robin, Monster } from '../libs/Imgs'

export default class FightView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enemyHP: 100,
      meHP: 100,
      onClick: Function,
      xIsNext: true
    }
    this.props = {
    }
  }

  componentDidMount () {
    this.setState()
  }

  render () {
    return (
      <div className='Wrapper' styles={styles.wrapper}>
        <div className='FightViewWrapper'>
          <div className='Enemy'>
            <Avatar pic={Monster} />
            <h3> Enemy </h3>
            <h3> {this.state.enemyHP} </h3>
          </div>
          <div className='Me'>
            <Avatar pic={Robin} />
            <h3>You </h3>
            <h3> {this.state.meHP} </h3>
          </div>
        </div>
        <div style={styles.fightButton}>
          <FightButton onClick={this.handleClickEvent} text={'Attack'} />
        </div>
      </div>
    )
  }

  handleClickEvent = (event) => {
    let eHP = this.state.enemyHP
    this.setState({enemyHP: eHP})
    let attack
    if (this.state.enemyHP === 0 || this.state.meHP === 0) {
      declareWinner()
    } else if (this.state.enemyHP > 0) {

    }
  }

  attack = () => {
    let eHP = this.state.enemyHP
    eHP = eHP - 10
    this.setState({
      enemyHP: eHP
    })
    if (eHP === 0) {
      return <div className="winner">YOU WON!</div>
    }
  }
}

let styles = {
  wrapper: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px'
  },
  fightButton: {
    display: 'flex',
    alignSelf: 'center',
    width: '10%'
  }

}
