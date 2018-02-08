// @ flow
import React, { Component } from 'react'
import FightButton from './FightButton'
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

  componentWillMount () {}

  componentDidMount () {}

  render () {
    let {winnerIsSet, playerHP, enemyHP, closeFightView} = this.state
    return <div style={styles.wrapper}>
      {/* winnerIsSet ? this.renderExit() : <div /> */}
      <EnemyComponent enemyHP={enemyHP} name={'Enemy'}/>
      {winnerIsSet ? this.renderWinner() : <div />}
      <PlayerComponent playerHP={playerHP} name={'Robin'}/>
      <div style={styles.fightButton}>
        <FightButton onClick={this.handleClickEvent} text={'Attack'} />
      </div>
    </div>
  }

  renderExit = () => { return <Button style={styles.exitButton} onClick={this.closeFightView}>X</Button> }

  closeFightView = () => this.setState({fightViewClose: false})

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
       }
     })
     console.log(enemyHP, playerHP)
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
  },
  winnerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    width: '200px'
  }
}
