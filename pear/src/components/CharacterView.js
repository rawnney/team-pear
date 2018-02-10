import React, { Component } from 'react'
import fakeServerData from '../fakeServerData'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap'
import Images from '../libs/Imgs'
import classnames from 'classnames'
import PearButton from './PearButton'

let { Sword, Dagger, Shield, Armor, Wand } = Images

export default class CharacterView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      activeTab: '1'
    }
  }

  signOut = () => {
    this.setState({loggedIn: false, user: {}})
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

  render () {
    // if (!coords) return <div />
    let {activeTab} = this.state
    // let {fakeServerData} = this.props
    let {user} = this.props
    let {sword, blockChance, magic, monstersKilled, coins, username, name, lastname, email} = user
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
              <ul style={{listStyle: 'none'}}>
                <li><p>Username: {username}</p> </li>
                <li><p>First name: {name}</p></li>
                <li><p>Last name: {lastname}</p></li>
                <li><p>Email: {email}</p></li>
              </ul>
            </TabPane>
            <TabPane tabId="2">
              <ModalHeader toggle={this.toggle}>Skills</ModalHeader>
              <br/>
              <ul style={{listStyle: 'none'}}>
                <li><p>Melee damage: {sword}</p> </li>
                <li><p>Block chance: {blockChance}</p></li>
                <li><p>Spell damage: {magic}</p></li>
              </ul>
            </TabPane>
            <TabPane tabId="3">
              <ModalHeader toggle={this.toggle}>Inventory</ModalHeader>
              <br/>
              <ul style={styles.listStyle}>
                <li>
                  <img style={styles.items} src={Sword} />
                  <img style={styles.items} src={Dagger} />
                  <img style={styles.items} src={Wand} />
                </li>
                <br />
                <li>
                  <img style={styles.items} src={Armor} />
                  <img style={styles.items} src={Shield} />
                </li>

              </ul>
            </TabPane>
            <TabPane tabId="4">
              <ModalHeader toggle={this.toggle}>Leaderboard</ModalHeader>
              <Table dark>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </TabPane>
            <TabPane tabId="5">
              <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Stats</ModalHeader>
              <br />
              <ul style={styles.listStyle}>
                <li><p>Monsters killed: {monstersKilled}</p> </li>
                <li><p>Coins: {coins}</p></li>
              </ul>
            </TabPane>
          </TabContent>
          <ModalFooter>
            <Button color="danger" onClick={this.togglemod} data-dismiss="modal">Close</Button>
            <PearButton text={'Sign out'} onClick={this.props.signOut} />
          </ModalFooter>
        </Modal>
      </div>
    )
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
  }

}
