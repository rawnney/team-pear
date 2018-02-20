import React, {Component} from 'react'
// eslint-disable-next-line
import {TabContent, TabPane, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalFooter} from 'reactstrap'
import Images from '../libs/Imgs'
import classnames from 'classnames'
import LeaderboardComponent from './LeaderboardComponent'
import 'whatwg-fetch'

let {Sword, Dagger, Shield, Armor, Wand} = Images

export default class CharacterView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      activeTab: '1',
      user: this.props.setUser,
      monstersKilled: this.props.monstersKilled
    }
  }

  signOut = () => {
    let {loggedIn} = this.state
    this.setState({loggedIn: false, user: {}})
    this.props.signOut(loggedIn)
  }

  togglemod = () => {
    let {setUser} = this.props
    this.setState({modal: !this.state.modal, user: setUser})
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render () {
    let {activeTab, user} = this.state
    return (
      <div>
        <nav style={styles.buttonWrapper}>
          <Button style={styles.menuButton} color="success" onClick={this.togglemod}>{this.props.buttonLabel}Menu</Button>
        </nav>
        <Modal isOpen={this.state.modal} togglemod={this.togglemod} className={this.props.className}>
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { this.toggle('1') }}>
                My Account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { this.toggle('2') }}>
                Skills
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { this.toggle('3') }}>
                Inventory
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { this.toggle('4') }}>
                Leaderboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => { this.toggle('5') }}>
                Stats
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <ModalHeader style={styles.modalHeader} toggle={this.toggle}>My Account</ModalHeader>
              <br />
              {user ? this.renderUserInfo() : <div/>}
            </TabPane>
            <TabPane tabId="2">
              <ModalHeader toggle={this.toggle}>Skills</ModalHeader>
              <br/>
              {user ? this.renderUserSkills() : <div />}
            </TabPane>
            <TabPane tabId="3">
              <ModalHeader toggle={this.toggle}>Inventory</ModalHeader>
              <br/>
              <ul style={styles.listStyle}>
                <li>
                  <img style={styles.items} src={Sword} alt='item' />
                  <img style={styles.items} src={Dagger} alt='item' />
                  <img style={styles.items} src={Wand} alt='item' />
                </li>
                <br />
                <li>
                  <img style={styles.items} src={Armor} alt='item' />
                  <img style={styles.items} src={Shield} alt='item' />
                </li>

              </ul>
            </TabPane>
            <TabPane tabId="4">
              <ModalHeader toggle={this.toggle}>Leaderboard</ModalHeader>
              <LeaderboardComponent />
            </TabPane>
            <TabPane tabId="5">
              <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Stats</ModalHeader>
              <br />
              {user ? this.renderUserStats() : <div/>}
            </TabPane>
          </TabContent>
          <ModalFooter>
            <Button color="info" onClick={this.togglemod}>Close</Button>
            <Button color="danger" onClick={this.signOut}>Sign out</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
  componentDidMount () {
  }

  renderUserSkills = () => {
    let {user} = this.state
    let {sword, blockChance, magic} = user
    return <ul style={styles.none}>
      <li><p>Melee damage: {sword}</p> </li>
      <li><p>Block chance: {blockChance}</p></li>
      <li><p>Spell damage: {magic}</p></li>
    </ul>
  }

  renderUserInfo = () => {
    let {user} = this.state
    let {username, name, lastname, email} = user
    return <ul style={styles.none}>
      <li><p>Username: {username}</p> </li>
      <li><p>First name: {name}</p></li>
      <li><p>Last name: {lastname}</p></li>
      <li><p>Email: {email}</p></li>
    </ul>
  }

  renderUserStats = () => {
    let {user} = this.state
    let {monstersKilled, coins} = user
    return <ul style={styles.listStyle}>
      <li><p>Monsters killed: {monstersKilled}</p></li>
      <li><p>Coins: {coins}</p></li>
    </ul>
  }
  // <div>
  //     <br/>
  //     <p>Register to save your progress!</p>
  //     <Button onClick={this.props.saveProgress} color="success">Save progress</Button>
  //   </div>
  // }
  // <div><Button onClick={this.saveProgress}>Register</Button></div>
}

let styles = {
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0',
    width: '100%'
  },
  menuButton: {
    width: 'auto',
    position: 'absolute',
    bottom: '0'
  },
  infoBar: {
    margin: '25px',
    display: 'flex',
    flexDirection: 'column'
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  listStyle: {
    listStyle: 'none'
  },
  items: {
    width: '40px',
    height: '40px'
  },
  none: {
    listStyle: 'none'
  }

}
