// @ flow
import React, { Component } from 'react'
import FightButton from './FightButton'
import EnemyComponent from './EnemyComponent'
import PlayerComponent from './PlayerComponent'
import MARKERS from './Markers'
import { Modal } from 'reactstrap'

export default class FightView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enemyHP: 100,
      playerHP: 100,
      winnerIsSet: false
    }
  }

  componentWillMount () {}

  componentDidMount () {
    this.setState()
  }

  render () {
    let {winnerIsSet, playerHP, enemyHP} = this.state
    return <div style={styles.wrapper}>
      <EnemyComponent enemyHP={enemyHP} name={'Enemy'}/>
      {winnerIsSet ? this.renderWinner() : <div />}
      <PlayerComponent playerHP={playerHP} name={'Robin'}/>
      <div style={styles.fightButton}>
        <FightButton onClick={this.handleClickEvent} text={'Attack'} />
      </div>
    </div>
  }

  renderWinner = () => {
    return <div style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', height: '200px', width: '200px'}}>
    YOU ARE WINNER!
    </div>
  }

  handleClickEvent = () => {
    let {enemyHP, playerHP} = this.state
    if (enemyHP > 0) {
      this.setState({enemyHP: enemyHP - 10}, () => {
        if (enemyHP === 10 || playerHP === 10) {
          this.setState({winnerIsSet: true})
        }
      })
    }
  }
}

let styles = {
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  fightButton: {
    width: '20%',
    margin: 'auto'
  }
}
