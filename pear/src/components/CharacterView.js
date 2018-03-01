import React, {Component} from 'react'
// eslint-disable-next-line
import {Form, TabContent, TabPane, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalFooter, FormGroup, Label, Col, Input, ModalBody} from 'reactstrap'
import {capitalizeFirstLetter} from '../libs/Common'
import Images from '../libs/Imgs'
import classnames from 'classnames'
import {itemWeapon} from './Items'
import LeaderboardComponent from './LeaderboardComponent'
import ShopComponent from './ShopComponent'
import axios from 'axios'
import SignUpNoRegComponent from './SignUpNoRegComponent'
import {API_UPDATE_USERNAME, API_UPDATE_EMAIL, API_UPDATE_PASSWORD} from '../libs/Const'

let {Sword, Dagger, Shield, Armor, Wand} = Images

export default class CharacterView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      activeTab: '1',
      user: this.props.setUser,
      editUser: false,
      updatedUser: {},
      userIsUpdated: false,
      error: false,
      signUp: false
    }
  }

  render () {
    let {activeTab, user, editUser, signUp} = this.state
    return (
      <div>
        <nav style={styles.buttonWrapper}>
          <Button style={styles.menuButton} color='success' onClick={this.togglemod}>{this.props.buttonLabel}Menu</Button>
        </nav>
        <Modal style={styles.modalStyle} isOpen={this.state.modal} toggle={this.togglemod} className={this.props.className}>
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
                {user.reg === 'true' && editUser === false ? this.renderUserInfo() : <div />}
                {user.reg === 'true' && editUser === true ? this.renderUserEditor() : <div />}
                {user.reg === 'false' ? this.renderNoRegUserInfo() : <div />}
                {user.reg === 'false' && signUp === true ? this.renderSignUpNoReg() : <div />}
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
                {user.reg ? this.renderUserItems() : <div />}
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
                <ShopComponent user={user} buyWeapon={this.buyWeapon} />
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
          {userIsUpdated ? this.renderMsg() : <Button color="success" type="submit">Update account details</Button>}
          {error && !userIsUpdated ? this.renderError() : <div />}
        </FormGroup>
      </Form>
    )
  }

  renderUserItems = () => {
    let {user} = this.state
    let {weapon, shield, head, chest, legs, feet} = user
    if (!weapon && !shield && !head && !chest && !legs && !feet) return <p style={styles.errorMsg}>You have no items, head over to the shop if you have the funds!</p>
    return <div>
      <ul style={styles.listStyle}>
        <li>
          <img style={styles.items} src={weapon} alt='item' />
          <img style={styles.items} src={Dagger} alt='item' />
          <img style={styles.items} src={Wand} alt='item' />
        </li>
        <br />
        <li>
          <img style={styles.items} src={Armor} alt='item' />
          <img style={styles.items} src={Shield} alt='item' />
        </li>
      </ul>
    </div>
  }

  renderUserSkills = () => {
    let {user} = this.state
    let {attack, block} = user
    return <div>
      <div>
        <img src={Sword} style={styles.attack} alt='Attack'/>
        <ul style={styles.none}>
          <li><p>Base attack: 10</p></li>
          <li><p>Weapon damage: {attack} %</p></li>
        </ul>
      </div>
      <hr />
      <div>
        <img src={Shield} style={styles.block} alt='Armor'/>
        <ul style={styles.none}>
          <li><p>Base defence: 5</p></li>
          <li><p>Armor: {block}</p></li>
        </ul>
      </div>
    </div>
  }

  renderNoRegUserInfo = () => {
    let {user} = this.state
    return <div>
      <h4 style={styles.userCall}>Hey {user.username}! </h4>
    You didnt signup when you started your adventure. But its not to late -
    you can still register to save your progress!
      <Button onClick={this.openSignUpNoReg} colo='success'>Sign up now</Button>
    </div>
  }

  renderSignUpNoReg = () => {
    let {user} = this.state
    return <SignUpNoRegComponent user={user}/>
  }

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

  renderUserStats = () => {
    let {user} = this.state
    let {monstersKilled, coins} = user
    return <ul style={styles.listStyle}>
      <li><p>Monsters killed: {monstersKilled}</p></li>
      <li><p>Coins: {coins}</p></li>
    </ul>
  }

  renderError = () => {
    return <p style={styles.errorMsg}>Something went wrong! Please check your changes or try again later!</p>
  }

  signOut = () => {
    let {loggedIn} = this.state
    this.setState({loggedIn: false, user: {}})
    this.props.signOut(loggedIn)
  }

  togglemod = () => {
    let {modal} = this.state
    let {setUser} = this.props
    this.setState({modal: !modal, userIsUpdated: false, error: false, editUser: false, user: setUser})
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  openSignUpNoReg = () => {
    this.setState({signUp: true})
  }

  enableUserEdit = () => {
    let {editUser} = this.state
    this.setState({editUser: !editUser})
  }

  renderMsg = () => {
    return <p style={styles.successMsg}>Account updated! You have to sign out for the changes to take place.</p>
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
    axios.put(API_UPDATE_USERNAME, {username: newUsername, iduser}).then(() => {
      this.setState({userIsUpdated: true, error: false})
    })
  }

  updateEmail = () => {
    let {user, updatedUser} = this.state
    let {email, iduser} = user
    let {newEmail} = updatedUser
    if (email === newEmail || newEmail === '' || newEmail === {} || newEmail === null || newEmail === undefined) return
    axios.put(API_UPDATE_EMAIL, {email: newEmail, iduser}).then(() => {
      this.setState({userIsUpdated: true, error: false})
    })
  }

  updatePassword = () => {
    let {user, updatedUser} = this.state
    let {password, iduser} = user
    let {newPassword} = updatedUser
    if (password === newPassword || newPassword === '' || newPassword === {} || newPassword === null || newPassword === undefined) return
    axios.put(API_UPDATE_PASSWORD, {password: newPassword, iduser}).then(() => {
      this.setState({userIsUpdated: true, error: false})
    })
  }

  //  SHOP ITEMS

  buyWeapon = () => {
    let {user} = this.state
    let {reg, coins, weapon} = user
    let newWeapon = itemWeapon[0]
    let {buyWeapon} = this.props
    if (reg === 'false') return
    if (coins < newWeapon.cost) return
    if (weapon === newWeapon.name) return
    this.setState({user: {...user, weapon: newWeapon.name, attack: newWeapon.dmg, coins: coins - newWeapon.cost}})
    if (buyWeapon) buyWeapon(user)
  }
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
  modalStyle: {
    display: 'flex',
    overflow: 'scroll'
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
  },
  userCall: {
    textAlign: 'center'
  },
  successMsg: {
    fontSize: '20px',
    color: 'green'
  },
  errorMsg: {
    fontSize: '20px',
    color: 'red'
  }
}
