// @ flow

//Obs not in Use

import React, { Component } from 'react'
import fakeServerData from '../fakeServerData';
import EnemyComponent from './EnemyComponent'
import PlayerComponent from './PlayerComponent'
import MARKERS from './Markers'
import MapView from './MapView'
import WinnerPopUp from './WinnerPopUp'
import { Modal, Button } from 'reactstrap'

type Props = {
  name: String,
  enemyHP: Number
}

type State = {
  enemyHP: Number,
  playerHP: Number,
  winnerIsSet: Boolean
}

export default class FightView extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      enemyHP: 100,
      playerHP: 100,
      winnerIsSet: false,
      modal: false
    }
  }

  render () {
    let {winnerIsSet, playerHP, enemyHP, closeFightView} = this.state
    return <div style={styles.wrapper}>
      {/* winnerIsSet ? this.renderExit() : <div /> */}
      <EnemyComponent enemyHP={enemyHP} name={'Enemy'}/>
      {winnerIsSet ? this.renderWinner() : <div />}
      <PlayerComponent playerHP={playerHP} name={fakeServerData.user.name}/>
      <div style={styles.fightButton}>
        <Button onClick={this.handleClickEvent} text={'Attack'} />
      </div>
    </div>
  }

  renderWinner = () => {
    return (
      <WinnerPopUp />
    )
  }

  handleClickEvent = () => {
    let {enemyHP, playerHP} = this.state
    if (enemyHP > 0) {
      this.setState({enemyHP: enemyHP - 10}, () => {
        if (enemyHP === 10 || playerHP === 10) {
          this.setState({winnerIsSet: true})
          this.props.checkForWinner()
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
  },
  exitButton: {
    width: '25px',
    height: '25px',
    borderRadius: '25'
  }
}
