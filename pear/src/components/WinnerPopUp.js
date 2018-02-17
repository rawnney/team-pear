import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Images from '../libs/Imgs'

let {coin} = Images

export default class WinnerPopUp extends Component {
  constructor (props) {
    super(props)
    this.state = {modal: true}
    // console.log(this.props);//without super(props) the readout will be undefined (but in this case the readout will be the contense of props)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    return (
      <div style={styles.WinnerPopUp}>
        {/* <Button color="danger" onClick={this.toggle}>Button</Button> */}
        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
          toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal Title</ModalHeader>
          <ModalBody>
            <img src={coin} style={styles.Coin} alt='coin' className="mx-auto d-block" />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Collect coin</Button>{''}
            <Button color='secondary' onClick={this.toggle}>Give coin</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

let styles = {
  WinnerPopUp: {
    height: '50px',
    width: '50px',
    borderRadius: '50%'
  },

  Coin: {
    height: 'auto',
    width: '80%'
  }
}

// the link to img (https://pixabay.com/en/bitcoin-blockchain-currency-coin-3125488/)
