import React, { Component } from 'react'
import {Modal, ModalHeader, Button, Form, FormGroup, Label, Input, FormText, Col, Nav, NavItem, NavLink, TabContent, TabPane, Table, ModalFooter, ModalBody} from 'reactstrap'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import SignUpComponent from './SignUpComponent'
import Welcome from './Welcome'
import Database from '../Database'
import fakeServerData from '../fakeServerData'
import Images from '../libs/Imgs'
import classnames from 'classnames'

let {Pear} = Images

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      modal: false,
      activeTab: '1'
    }
  }

  myCallback = (dataFromChild) => {
    let {response} = this.state
    let clear = null
    if (response === null || response !== dataFromChild) return this.setState({response: dataFromChild})
    if (response === dataFromChild) return this.setState({response: clear})
  }

  signIn = (e, user) => {
    e.preventDefault()
    let {loggedIn, tempUser} = this.state
    this.props.setLoggedIn(tempUser) // fakeServerData.user
    if (loggedIn === false) {
      return this.setState({loggedIn: true, user: tempUser}) // fakeServerData.user
    }
  }

  signOut () {
    this.setState({user: null})
  }

  togglemod = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  // validateForm () {
  //   return this.state.email.length > 0 && this.state.password.length > 0
  // }

  render () {
    let {} = this.props
    let {loggedIn, modal, user, activeTab, tempUser} = this.state
    return <main style={styles.wrapper}>
      <header>
        <img style={styles.logo} src={Pear} />
        <h1>Pear Game</h1>
        {this.renderUser()}
        {tempUser ? this.renderTempUser() : <div />}
      </header>
      <section style={styles.section}>
        <div style={styles.buttoncontainer}>
          <Button style={styles.button} onClick={this.togglemod} color="success">Sign In / Sign Up</Button>
          <Button style={styles.button} onClick={this.togglemod} color="primary">Leaderboard</Button>
          <Button style={styles.button} onClick={this.togglemod} color="info">Info</Button>
        </div>
      </section>
      {/* modal starts */}
      <Modal style={{display: 'flex', justifyContent: 'center'}} isOpen={modal} togglemod={this.togglemod} className={this.props.className}>
        <ModalHeader>
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { this.toggle('1') }}>
              Sign In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { this.toggle('2') }}>
              Sign up
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <ModalBody>
                <LoginForm onSignIn={this.signIn}/>
              </ModalBody>
            </TabPane>
            <TabPane tabId="2">
              <ModalBody>
                <SignUpComponent/>
              </ModalBody>
            </TabPane>
          </TabContent>
          <ModalFooter style={styles.section}>
            <Button color="danger" onClick={this.togglemod} data-dismiss="modal">Cancel</Button>
          </ModalFooter>
        </ModalHeader>
      </Modal>
    </main>
  }

  renderUser () {
    let {user, tempUser} = this.state
    if (!user || !tempUser) return <div />
    if (user) return {user}
    if (!tempUser) return {tempUser}
  }
}

let styles = {
  wrapper: {
    textAlign: 'center'
  },
  logo: {
    width: '100px',
    height: '160px'
  },
  section: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '200px'
  },
  button: {
    margin: '10px',
    width: '200px'
  }
}
