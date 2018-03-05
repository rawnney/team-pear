import React, {Component} from 'react'
import {Form, TabContent, TabPane, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalFooter, FormGroup, Label, Col, Input, ModalBody} from 'reactstrap'
import Images from '../libs/Imgs'
import io from 'socket.io-client'

export default class GlobalChatComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.setUser,
      modal: false,
      message: '',
      messages: []
    }
    this.toggle = this.toggle.bind(this)
    this.socket = io('localhost:5000')

    this.socket.on('RECEIVE_MESSAGE', (data) => {
      addMessage(data)
    })

    const addMessage = data => {
      console.log(data)
      this.setState({messages: [...this.state.messages, data]})
    }

    this.sendMessage = ev => {
      ev.preventDefault()
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.user.username,
        message: this.state.message
      })
      this.setState({message: ''})
    }
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    let {user} = this.state

    return (
      <div>
        <div style={styles.buttonWrapper}>
          <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}Global Chat</Button>
          <Modal style={styles.modalStyle} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Global Chat</ModalHeader>
            <ModalBody>

              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="col-12"><img style={styles.smallAvatar} src={Images[user.avatar]} />{user.username}</div>
                        <hr/>
                        <div className="messages">
                          {this.state.messages.map(message => {
                            return (
                              <div key={message}><img style={styles.smallAvatar} src={Images[user.avatar]} />{message.author}: {message.message}</div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="card-footer">
                        <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                        <br/>
                        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close Chat</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

let styles = {
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '42px',
    width: '10%',
    left: '45%'
  },
  menuButton: {
    width: '100px',
    position: 'absolute',
    bottom: '0'
  },
  modalStyle: {
    display: 'flex',
    overflow: 'scroll'
  },
  user: {
    float: 'left'
  },
  smallAvatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%'
  }
}
