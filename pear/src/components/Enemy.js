// @ flow
import React, { Component } from 'react'

export default class FightView extends Component {

  render () {
    return (
      <div className='EnemyWrapper'>
        <div className=''>
          <div className='Enemy'>
            <h3> Enemy </h3>
            <h3> {this.prop.enemyHP} </h3>
          </div>
        </div>
      </div>
    )
  }

  onAttack = () => {
    let eHP = this.state.enemyHP
    eHP = eHP - 10
    this.setState({
      enemyHP: eHP
    })
  }
}

// checkHealth = () => {
//   if (enemyHP === 0) {
//     return 'DEAD'
//   }
// }
