import React, {Component} from 'react'
// eslint-disable-next-line
import {Modal, ModalHeader, Button, Nav, NavItem, NavLink, TabContent, TabPane, ModalFooter, ModalBody} from 'reactstrap'
import LoginForm from './LoginForm'
import NoRegComponent from './NoRegComponent'
import SignUpComponent from './SignUpComponent'
import Welcome from './Welcome'
import LeaderboardComponent from './LeaderboardComponent'
import InfoComponent from './InfoComponent'
import Images from '../libs/Imgs'
import classnames from 'classnames'
import EyeIcon from './EyeIcon'

let {Pear} = Images

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      modalLogin: false,
      modalLeaderboard: false,
      modalInfo: false,
      activeTab: '1'
    }
  }

  signIn = (user) => {
    let {setUser} = this.props
    this.setState({user, modalLogin: false})
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
    this.setState({user: {...user, monstersKilled, coins}})
  }

  toggleLogin = () => {
    this.setState({
      modalLogin: !this.state.modalLogin
    })
  }

  toggleLeaderboard = () => {
    this.setState({
      modalLeaderboard: !this.state.modalLeaderboard
    })
  }

  toggleInfo = () => {
    this.setState({
      modalInfo: !this.state.modalInfo
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
    let {modalLogin, modalLeaderboard, modalInfo, activeTab} = this.state
    return <main style={styles.wrapper}>
      <header>
        <EyeIcon />
        <h1>Pear Game</h1>
      </header>
      <section style={styles.section}>
        <div style={styles.buttoncontainer}>
          {this.renderLoginExit()}
          <Button style={styles.button} onClick={this.toggleLeaderboard} color="primary">Leaderboard</Button>
          <Button style={styles.button} onClick={this.toggleInfo} color="info">Info</Button>
          <NavLink style={styles.buttonlook} href="https://peargame.000webhostapp.com/" target="_blank">Players Info</NavLink>
        </div>

      </section>
      <Modal style={styles.modalStyle} isOpen={modalLogin} toggle={this.toggleLogin} className={this.props.className}>
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
                <SignUpComponent onSignIn={this.signIn}/>
              </ModalBody>
            </TabPane>
            <TabPane tabId="3">
              <ModalBody>
                <NoRegComponent onSignIn={this.signIn} />
              </ModalBody>
            </TabPane>
          </TabContent>
          <ModalFooter style={styles.section}>
            <Button color="danger" onClick={this.toggleLogin}>Cancel</Button>
          </ModalFooter>
        </ModalHeader>
      </Modal>
      <Modal style={styles.modalStyle} isOpen={modalLeaderboard} toggle={this.modalLeaderboard}>
        <ModalHeader>
          Leaderboard
        </ModalHeader>
        <ModalBody>
          <LeaderboardComponent />
        </ModalBody>
        <ModalFooter style={styles.section}>
          <Button color="danger" onClick={this.toggleLeaderboard}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal style={styles.modalStyle} isOpen={modalInfo} toggleLogin={this.modalLeaderboard}>
        <ModalHeader>
          Info
        </ModalHeader>
        <InfoComponent />
        <ModalFooter style={styles.section}>
          <Button color="danger" onClick={this.toggleInfo}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </main>
  }

  renderLoginExit = () => {
    let {user} = this.state
    if (user != null) return <Welcome user={user.username} goToGame={this.setLoggedIn} signOut={this.signOut}/>
    else return <Button style={styles.button} onClick={this.toggleLogin} color="success">Sign In / Sign Up</Button>
  }
}

let styles = {
  modalStyle: {
    display: 'flex',
    justifyContent: 'center'
  },
  wrapper: {
    marginTop: '50px',
    textAlign: 'center'
  },
  logo: {
    height: '160px'
  },
  section: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '200px',
    alignItems: 'center'
  },
  button: {
    margin: '10px',
    width: '200px'
  },
  buttonlook: {
    color: '#fff',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontWeight: '400',
    width: '200px',
    margin: '10px',
    border: '1px solid transparent',
    padding: '.375rem .75rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    borderRadius: '.25rem',
    transition: 'color .15s'
  }
}
