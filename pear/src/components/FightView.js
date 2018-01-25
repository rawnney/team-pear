// @ flow
import React, { Component } from 'react'
import FightButton from './FightButton'
import EnemyComponent from './EnemyComponent'
import PlayerComponent from './PlayerComponent'

export default class FightView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enemyHP: 100,
      playerHP: 100,
      onClick: Function
    }
  }

  componentDidMount () {
    this.setState()
  }

  render () {
    return (
      <div className='FightWrapper' styles={styles.wrapper}>
        <EnemyComponent enemyHP={this.state.enemyHP} name={'Enemy'}/>
        {/* TODO this.status */}
        <PlayerComponent playerHP={this.state.playerHP} name={'Robin'}/>
        <div style={styles.fightButton}>
          <FightButton onClick={this.handleClickEvent} text={'Attack'} />
        </div>
      </div>
    )
  }

  handleClickEvent = () => {
    let eHP = this.state.enemyHP
    let pHP = this.state.playerHP
    this.setState({enemyHP: eHP, playerHP: pHP})
    let attack
    if (this.state.enemyHP === 0 || this.state.meHP === 0) {
      { /* declareWinner() */ }
    } else if (this.state.enemyHP > 0) {
      attack()
    }
  }

  attack = () => {
    let eHP = this.state.enemyHP
    eHP = eHP - 10
    this.setState({
      enemyHP: eHP
    })
    if (eHP === 0) {
    }
  }
}

let styles = {
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  fightButton: {
    width: '10%',
    margin: 'auto'
  }
}
