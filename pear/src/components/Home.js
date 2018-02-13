import React, { Component } from 'react'
import {Modal, ModalHeader, Button, Form, FormGroup, Label, Input, FormText, Col, Nav, NavItem, NavLink, TabContent, TabPane, Table, ModalFooter, ModalBody} from 'reactstrap'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import NoRegComponent from './NoRegComponent'
import SignUpComponent from './SignUpComponent'
import Welcome from './Welcome'
import Database from '../Database'
import fakeServerData from '../fakeServerData'
import Images from '../libs/Imgs'
import axios from 'axios'
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

  signIn = (user) => {
    let {setUser} = this.props
    this.setState({user, modal: false})
    if (setUser) setUser(user)
  }

  setLoggedIn = () => {
    let {setLoggedIn} = this.props
    this.setState({loggedIn: setLoggedIn()})
  }

  signOut = (user) => {
    this.saveProgress()
    this.setState({user: null, loggedIn: false})
  }

  saveProgress = (user) => {
    let {monstersKilled, coins} = this.state
    let {updateUser} = this.props
    updateUser(monstersKilled, coins)
    this.setState({user: {...user, monstersKilled, coins}})
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

  // TODO: Validate with db
  // validateForm () {
  //   return this.state.email.length > 0 && this.state.password.length > 0
  // }

  render () {
    let {modal, activeTab} = this.state
    return <main style={styles.wrapper}>
      <header>
        <img style={styles.logo} src={Pear} />
        <h1>Pear Game</h1>
      </header>
      <section style={styles.section}>
        <div style={styles.buttoncontainer}>
          {this.renderLoginExit()}
          <Button style={styles.button} onClick={this.togglemod} color="primary">Leaderboard</Button>
          <Button style={styles.button} onClick={this.togglemod} color="info">Info</Button>
        </div>
      </section>
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
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { this.toggle('3') }}>
              Play now!
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <ModalBody>
                <LoginForm onSignIn={this.signIn} />
              </ModalBody>
            </TabPane>
            <TabPane tabId="2">
              <ModalBody>
                <SignUpComponent/>
              </ModalBody>
            </TabPane>
            <TabPane tabId="3">
              <ModalBody>
                <NoRegComponent onSignIn={this.signIn} />
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

  renderLoginExit = () => {
    let {user} = this.state
    if (user != null) return <Welcome user={user.username} goToGame={this.setLoggedIn} signOut={this.signOut}/>
    else return <Button style={styles.button} onClick={this.togglemod} color="success">Sign In / Sign Up</Button>
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
