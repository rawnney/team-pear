// @ flow
import React, { Component } from 'react'
import FightButton from './FightButton'
import EnemyComponent from './EnemyComponent'
import PlayerComponent from './PlayerComponent'
import WinnerPopUp from './WinnerPopUp'

export default class FightView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enemyHP: 100,
      playerHP: 100,
      winnerIsSet: false,
      modal: false
    }
  }

  componentDidMount () {
    this.setState()
  }

  render () {
    let {winnerIsSet, playerHP, enemyHP, modal} = this.state
    return <div className='FightWrapper' styles={styles.wrapper}>
      <EnemyComponent enemyHP={enemyHP} name={'Enemy'}/>
      <PlayerComponent playerHP={playerHP} name={'Robin'}/>
      <div style={styles.fightButton}>
        <FightButton onClick={this.handleClickEvent} text={'Attack'} />
      </div>
      {winnerIsSet ? this.renderWinner() : <div />}
    </div>
  }

 renderWinner = () => {
   return <WinnerPopUp />
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
    width: '10%',
    margin: 'auto'
  }
}
