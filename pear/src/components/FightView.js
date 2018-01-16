// @ flow

import React, { Component } from 'react'
import { Button } from 'reactstrap'

// let enemyHP = 100
// let currentHP = enemyHP

export default class FightView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enemyHP: 100,
      meHP: 100,
      onClick: Function
    }
    this.props = {}
  }

  componentDidMount () {
    this.setState()
  }

  render () {
    return (
      <div className='Wrapper'>
        <div className='FightViewWrapper'>
          <div className='Enemy'>
            <h3> Enemy </h3>
            <h3> {this.state.enemyHP} </h3>
          </div>
          <div className='Me'>
            <h3>You </h3>
            <h3> {this.state.meHP} </h3>
          </div>
        </div>
        <div className='optionBar'>
          <ul style={{listStyle: 'none'}}>
            <Button onClick={this.onAttack}><li>Attack</li></Button>
          </ul>
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
