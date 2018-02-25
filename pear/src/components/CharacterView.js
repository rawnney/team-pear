import React, {Component} from 'react'
// eslint-disable-next-line
import {Form, TabContent, TabPane, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalFooter, FormGroup, Label, Col, Input, ModalBody} from 'reactstrap'
import {capitalizeFirstLetter} from '../libs/Common'
import Images from '../libs/Imgs'
import classnames from 'classnames'
import LeaderboardComponent from './LeaderboardComponent'
import ShopComponent from './ShopComponent'
import axios from 'axios'

let {Sword, Dagger, Shield, Armor, Wand} = Images

const UPDATE_USERNAME = 'http://peargameapi.herokuapp.com/api/update_username'
const UPDATE_EMAIL = 'http://peargameapi.herokuapp.com/api/update_email'
const UPDATE_PASSWORD = 'http://peargameapi.herokuapp.com/api/update_password'

export default class CharacterView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      activeTab: '1',
      user: this.props.setUser,
      monstersKilled: this.props.monstersKilled,
      editUser: false,
      updatedUser: {},
      userIsUpdated: false,
      error: false
    }
  }

  signOut = () => {
    let {loggedIn} = this.state
    this.setState({loggedIn: false, user: {}})
    this.props.signOut(loggedIn)
  }

  togglemod = () => {
    let {modal} = this.state
    this.setState({modal: !modal, userIsUpdated: false, error: false})
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render () {
    let {activeTab, user, editUser} = this.state
    return (
      <div>
        <nav style={styles.buttonWrapper}>
          <Button style={styles.menuButton} color='success' onClick={this.togglemod}>{this.props.buttonLabel}Menu</Button>
        </nav>
        <Modal isOpen={this.state.modal} togglemod={this.togglemod} className={this.props.className}>
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { this.toggle('1') }}>
                Account
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
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '6' })} onClick={() => { this.toggle('6') }}>
                Shop
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Account</ModalHeader>
              <ModalBody>
                {user.reg === 'true' && editUser === false ? this.renderUserInfo() : this.renderNoRegUserInfo()}
                {user.reg === 'true' && editUser === true ? this.renderUserEditor() : <div />}
                {/* //TODO render no-reg-options */}
              </ModalBody>
            </TabPane>
            <TabPane tabId='2'>
              <ModalHeader toggle={this.toggle}>Skills</ModalHeader>
              <ModalBody>
                {user ? this.renderUserSkills() : <div />}
              </ModalBody>
            </TabPane>
            <TabPane tabId='3'>
              <ModalHeader toggle={this.toggle}>Inventory</ModalHeader>
              <ModalBody>
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
              </ModalBody>
            </TabPane>
            <TabPane tabId='4'>
              <ModalHeader toggle={this.toggle}>Leaderboard</ModalHeader>
              <ModalBody>
                <LeaderboardComponent />
              </ModalBody>
            </TabPane>
            <TabPane tabId='5'>
              <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Stats</ModalHeader>
              <ModalBody>
                {user ? this.renderUserStats() : <div/>}
              </ModalBody>
            </TabPane>
            <TabPane tabId='6'>
              <ModalHeader toggle={this.toggle}>Shop</ModalHeader>
              <ModalBody style={styles.shopModal}>
                <ShopComponent />
              </ModalBody>
            </TabPane>
          </TabContent>
          <ModalFooter>
            <Button color='info' onClick={this.togglemod}>Close</Button>
            <Button color='danger' onClick={this.signOut}>Sign out</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  renderUserSkills = () => {
    let {user} = this.state
    let {attack, block} = user
    return <div>
      <div>
        <img src={Sword} style={styles.attack} alt='Attack'/>
        <ul style={styles.none}>
          <li><p>Base attack damage: 10</p></li>
          <li><p>Weapon damage: {attack} %</p></li>
        </ul>
      </div>
      <hr />
      <div>
        <img src={Shield} style={styles.block} alt='Armor'/>
        <ul style={styles.none}>
          <li><p>Base defence value: 5</p></li>
          <li><p>Armor value: {block}</p></li>
        </ul>
      </div>
    </div>
  }

  renderNoRegUserInfo = () => {}

  renderUserInfo = () => {
    let {user} = this.state
    let {username, email} = user
    return <div>
      <ul style={styles.none}>
        <li><p>Username: {username}</p></li>
        <li><p>Email: {email}</p></li>
      </ul>
      <Button onClick={this.enableUserEdit}>Edit details</Button>
    </div>
  }

  enableUserEdit = () => {
    let {editUser} = this.state
    this.setState({editUser: !editUser})
  }

  renderUserEditor = () => {
    let {user, updatedUser, userIsUpdated, error} = this.state
    let {username, email} = user
    let {newUsername, newEmail, newPassword} = updatedUser
    return (
      <Form onSubmit={this.updateChanges}>
        <FormGroup row>
          <Label for="Current username" sm={4}>Username: {username}</Label>
          <Col sm={8}>
            <Input type="text" onChange={this.editUsername} value={newUsername} placeholder="New Username" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Current Email" sm={4}>Email: {email}</Label>
          <Col sm={8}>
            <Input type="email" onChange={this.editEmail} value={newEmail} placeholder="New Email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="New password" sm={4}>Password</Label>
          <Col sm={8}>
            <Input type="password" onChange={this.editPassword} value={newPassword} placeholder="New Password" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Button color="success" type="submit">Update account details</Button>
          {error && !userIsUpdated ? this.renderError() : <div />}
          {userIsUpdated && !error ? this.renderMsg() : <div />}
        </FormGroup>
      </Form>
    )
  }

  renderMsg = () => {
    return <p>Account updated! You have to sign out for the changes to take place.</p>
  }

  editUsername = (newUsername) => {
    let {updatedUser} = this.state
    this.setState({updatedUser: {...updatedUser, newUsername: capitalizeFirstLetter(newUsername.target.value)}})
  }

  editEmail = (newEmail) => {
    let {updatedUser} = this.state
    this.setState({updatedUser: {...updatedUser, newEmail: newEmail.target.value}})
  }

  editPassword = (newPassword) => {
    let {updatedUser} = this.state
    this.setState({updatedUser: {...updatedUser, newPassword: newPassword.target.value}})
  }

  updateChanges = (e) => {
    let {userIsUpdated} = this.state
    e.preventDefault()
    this.updateUsername()
    this.updateEmail()
    this.updatePassword()
    if (!userIsUpdated) this.setState({error: true})
  }

  updateUsername = () => {
    let {user, updatedUser} = this.state
    let {username, iduser} = user
    let {newUsername} = updatedUser
    if (newUsername === username || newUsername === '' || newUsername === {} || newUsername === null || newUsername === undefined) return
    axios.put(UPDATE_USERNAME, {username: newUsername, iduser}).then(() => {
      this.setState({userIsUpdated: true, error: false})
    })
  }

  updateEmail = () => {
    let {user, updatedUser} = this.state
    let {email, iduser} = user
    let {newEmail} = updatedUser
    if (email === newEmail || newEmail === '' || newEmail === {} || newEmail === null || newEmail === undefined) return
    axios.put(UPDATE_EMAIL, {email: newEmail, iduser}).then(() => {
      this.setState({userIsUpdated: true, error: false})
    })
  }

  updatePassword = () => {
    let {user, updatedUser} = this.state
    let {password, iduser} = user
    let {newPassword} = updatedUser
    if (password === newPassword || newPassword === '' || newPassword === {} || newPassword === null || newPassword === undefined) return
    axios.put(UPDATE_PASSWORD, {password: newPassword, iduser}).then(() => {
      this.setState({userIsUpdated: true, error: false})
    })
  }

  // TODO // else { this.setState({error: true}) }

  renderError = () => {
    return 'Something went wrong! Please check your changes or try again later!'
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
  //     <Button onClick={this.props.saveProgress} color='success'>Save progress</Button>
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
    width: '100px',
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
  attack: {
    width: '30px'
  },
  block: {
    width: '30px'
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
  },
  inputStyle: {
    float: 'right',
    marginRight: '20px',
    width: '120px',
    borderColor: 'black',
    borderWidth: '1px'
  },
  shopModal: {
    padding: 0
  }
}
