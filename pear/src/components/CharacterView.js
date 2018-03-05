import React, {Component} from 'react'
// eslint-disable-next-line
import {Form, TabContent, TabPane, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalFooter, FormGroup, Label, Col, Input, ModalBody} from 'reactstrap'
import {capitalizeFirstLetter} from '../libs/Common'
import Images from '../libs/Imgs'
import classnames from 'classnames'
import {itemWeapon, itemShield, itemHead, itemChest, itemLegs, itemFeet, itemStart} from '../libs/Items'
import LeaderboardComponent from './LeaderboardComponent'
import ShopComponent from './ShopComponent'
import GlobalChatComponent from './GlobalChatComponent'
import axios from 'axios'
import SignUpNoRegComponent from './SignUpNoRegComponent'
import {API_UPDATE_USERNAME, API_UPDATE_EMAIL, API_UPDATE_PASSWORD} from '../libs/Const'

let {KillIcon, CoinStack} = Images

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
                Character
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { this.toggle('2') }}>
                Account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { this.toggle('3') }}>
                Leaderboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { this.toggle('4') }}>
                Stats
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => { this.toggle('5') }}>
                Shop
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='2'>
              <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Account</ModalHeader>
              <ModalBody>
                {user.reg === 'true' && editUser === false ? this.renderUserInfo() : <div />}
                {user.reg === 'true' && editUser === true ? this.renderUserEditor() : <div />}
                {user.reg === 'false' ? this.renderNoRegUserInfo() : <div />}
                {user.reg === 'false' && signUp === true ? this.renderSignUpNoReg() : <div />}
              </ModalBody>
            </TabPane>
            <TabPane tabId='1'>
              <ModalHeader toggle={this.toggle}>Character</ModalHeader>
              <ModalBody>
                { user ? this.renderCharacter() : <div />}
              </ModalBody>
            </TabPane>
            <TabPane tabId='3'>
              <ModalHeader toggle={this.toggle}>Leaderboard</ModalHeader>
              <ModalBody>
                <LeaderboardComponent />
              </ModalBody>
            </TabPane>
            <TabPane tabId='4'>
              <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Stats</ModalHeader>
              <ModalBody>
                {user ? this.renderUserStats() : <div/>}
              </ModalBody>
            </TabPane>
            <TabPane tabId='5'>
              <ModalHeader toggle={this.toggle}>Shop</ModalHeader>
              <ModalBody style={styles.shopModal}>
                <ShopComponent
                  user={user}
                  buyWeapon={this.buyWeapon}
                  buyShield={this.buyShield}
                  buyHead={this.buyHead}
                  buyChest={this.buyChest}
                  buyLegs={this.buyLegs}
                  buyFeet={this.buyFeet}
                />
              </ModalBody>
            </TabPane>
            <TabPane tabId='6'>
              <ModalHeader toggle={this.toggle}>GlobalChat</ModalHeader>
              <ModalBody>
                <GlobalChatComponent />
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
          {userIsUpdated ? this.renderMsg() : <Button color='success' type='submit'>Update account details</Button>}
          {error && !userIsUpdated ? this.renderError() : <div />}
        </FormGroup>
      </Form>
    )
  }

  renderCharacter = () => {
    let {user} = this.state
    return <div style={styles.characterContainer}>
      {user ? this.renderUserSkills() : <div />}
      {user.reg ? this.renderUserItems() : <div />}
    </div>
  }

  renderUserItems = () => {
    let {user} = this.state
    let {weapon, shield, head, chest, legs, feet} = user
    // if (!weapon && !shield && !head && !chest && !legs && !feet) return <p style={styles.errorMsg}>You have no items, head over to the shop if you have the funds!</p>
    return <div style={styles.itemWrapper}>
      <div style={styles.itemTopSection}>
        {head === 100 ? <img src={itemStart[0].img} style={styles.userItem} alt='0' />
          : <img src={itemHead[head].img} style={styles.userItem} alt='O'/> }
      </div>
      <div style={styles.itemMidSection}>
        {weapon === 101 ? <img src={itemStart[1].img} style={styles.userItem} alt='0' />
          : <img src={itemWeapon[weapon].img} style={styles.userItem} alt='O' /> }
        {chest === 102 ? <img src={itemStart[2].img} style={styles.userItem} alt='0' />
          : <img src={itemChest[chest].img} style={styles.userItem} alt='O' /> }
        {shield === 103 ? <img src={itemStart[3].img} style={styles.userItem} alt='0' />
          : <img src={itemShield[shield].img} style={styles.userItem} alt='O' /> }
      </div>
      <div style={styles.itemLowSection}>
        {legs === 104 ? <img src={itemStart[4].img} style={styles.userItem} alt='0' />
          : <img src={itemLegs[legs].img} style={styles.userItem} alt='O' /> }
        {feet === 105 ? <img src={itemStart[5].img} style={styles.userItem} alt='0' />
          : <img src={itemFeet[feet].img} style={styles.userItem} alt='O' /> }
      </div>
    </div>
  }

  renderUserSkills = () => {
    let {user} = this.state
    let {attack, block} = user
    return <div>
      <div>
        <p style={styles.skillHeader}>Attack</p>
        <ul style={styles.listStyle}>
          <li><p>Base attack: 15</p></li>
          <li><p>Weapon damage: {attack}%</p></li>
        </ul>
      </div>
      <hr />
      <div>
        <p style={styles.skillHeader}>Armor</p>
        <ul style={styles.listStyle}>
          <li><p>Base armor: 5</p></li>
          <li><p>Armor: {block}</p></li>
        </ul>
      </div>
    </div>
  }

  renderNoRegUserInfo = () => {
    let {user} = this.state
    return <div>
      <h4 style={styles.userCall}>Hey {user.username}!</h4>
      <p style={styles.successMsg}>
    You didnt signup when you started your adventure. But its not to late -
    you can still register to save your progress!</p>
      <Button onClick={this.openSignUpNoReg} color='success'>Sign up now</Button>
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
      <ul style={styles.listStyle}>
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
      <li style={styles.statsItem}>
        <img src={KillIcon} style={styles.statsIcon} alt='Kills'/>
        <p>Monsters killed: {monstersKilled}</p>
      </li>
      <li style={styles.statsItem}>
        <img src={CoinStack} style={styles.statsIcon} alt='Coins'/>
        <p>Coins: {coins}</p>
      </li>
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

  buyWeapon = (i) => {
    let {user} = this.state
    let {reg, coins, weapon} = user
    let newWeapon = itemWeapon[i]
    let {buyWeapon} = this.props
    if (reg === 'false') return
    if (coins < newWeapon.cost) return
    if (weapon === newWeapon.id) return
    this.setState({user: {...user, weapon: newWeapon.id, attack: newWeapon.dmg, coins: coins - newWeapon.cost}})
    if (buyWeapon) buyWeapon(i)
  }

  buyShield = (i) => {
    let {user} = this.state
    let {reg, coins, shield, block} = user
    let newShield = itemShield[i]
    let {buyShield} = this.props
    if (reg === 'false') return
    if (coins < newShield.cost) return
    if (shield === newShield.id) return
    this.setState({user: {...user, shield: newShield.id, block: block + newShield.block, coins: coins - newShield.cost}})
    if (buyShield) buyShield(i)
  }

  buyHead = (i) => {
    let {user} = this.state
    let {reg, coins, head, block} = user
    let newHead = itemHead[i]
    let {buyHead} = this.props
    if (reg === 'false') return
    if (coins < newHead.cost) return
    if (head === newHead.id) return
    this.setState({user: {...user, head: newHead.id, block: block + newHead.block, coins: coins - newHead.cost}})
    if (buyHead) buyHead(i)
  }

  buyChest = (i) => {
    let {user} = this.state
    let {reg, coins, chest, block} = user
    let newChest = itemChest[i]
    let {buyChest} = this.props
    if (reg === 'false') return
    if (coins < newChest.cost) return
    if (chest === newChest.id) return
    this.setState({user: {...user, chest: newChest.id, block: block + newChest.block, coins: coins - newChest.cost}})
    if (buyChest) buyChest(i)
  }

  buyLegs = (i) => {
    let {user} = this.state
    let {reg, coins, legs, block} = user
    let newLegs = itemLegs[i]
    let {buyLegs} = this.props
    if (reg === 'false') return
    if (coins < newLegs.cost) return
    if (legs === newLegs.id) return
    this.setState({user: {...user, legs: newLegs.id, block: block + newLegs.block, coins: coins - newLegs.cost}})
    if (buyLegs) buyLegs(i)
  }

  buyFeet = (i) => {
    let {user} = this.state
    let {reg, coins, feet, block} = user
    let newFeet = itemFeet[i]
    let {buyFeet} = this.props
    if (reg === 'false') return
    if (coins < newFeet.cost) return
    if (feet === newFeet.id) return
    this.setState({user: {...user, feet: newFeet.id, block: block + newFeet.block, coins: coins - newFeet.cost}})
    if (buyFeet) buyFeet(i)
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
  listStyle: {
    listStyle: 'none',
    paddingLeft: '0'
  },
  skillHeader: {
    fontSize: '20px',
    fontWeight: 600,
    borderBottom: '1px solid #e9ecef'
  },
  items: {
    width: '40px',
    height: '40px'
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
    color: 'green',
    padding: '20px'
  },
  errorMsg: {
    fontSize: '20px',
    color: 'red'
  },
  statsIcon: {
    height: '25px',
    width: '25px',
    marginRight: '10px'
  },
  statsItem: {
    display: 'flex'
  },
  characterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px'
  },
  itemTopSection: {
    display: 'flex',
    justifyContent: 'center'
  },
  itemMidSection: {
    display: 'flex',
    flexDirection: 'row'
  },
  itemLowSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  userItem: {
    height: '30px',
    width: '30px'
  }
}
