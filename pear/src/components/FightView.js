// @ flow
import React, { Component } from 'react'
import { Button } from 'reactstrap'
// import Monster from '../assets/img/monster-icon.png'

export default class FightView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enemyHP: 100,
      meHP: 100,
      onClick: Function
    }
    this.props = {

    }
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
        <div>
          <ul className='optionBar'>
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
    if (this.state.enemyHP === 0) {
      return (
        <div className="winner">
          <div>YOU WON!</div>
        </div>
      )
    } else {
      return (
        <div className="winner">
          <div>YOU WON!</div>
        </div>
      )
    }
  }

  declareWinner () {
  }
}
