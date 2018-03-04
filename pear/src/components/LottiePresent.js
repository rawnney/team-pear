import React, {Component} from 'react'
import Lottie from 'react-lottie'
import * as animationData from '../assets/lottieAnimations/present.json'

export default class LottiePresent extends Component {
  constructor (props) {
    super(props)
    this.state = {isStopped: false, isPaused: false}
  }

  render () {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    }

    return <div>
      <Lottie options={defaultOptions}
        height={75}
        width={75}
        isStopped={this.state.isStopped}
        isPaused={this.state.isPaused}/>
    </div>
  }
}
