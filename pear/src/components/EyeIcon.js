import React, {Component} from 'react'
import Lottie from 'react-lottie'
import * as animationData from '../assets/lottieAnimations/eyeIcon.json'

export default class EyeIcon extends Component {
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
        height={150}
        width={250}
        isStopped={this.state.isStopped}
        isPaused={this.state.isPaused}/>
    </div>
  }
}
