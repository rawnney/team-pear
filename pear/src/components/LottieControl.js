import React, {Component} from 'react'
import Lottie from 'react-lottie'
import * as animationData from '../assets/lottieAnimations/pinjump.json'

export default class LottieControl extends Component {
  constructor (props) {
    super(props)
    this.state = {isStopped: false, isPaused: false}
  }

  render () {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: '100%'
      }
    }

    return <div>
      <Lottie options={defaultOptions}
        height={400}
        width={300}
        isStopped={this.state.isStopped}
        isPaused={this.state.isPaused}/>
    </div>
  }
}
