import React, { Component } from 'react'

// import Items from './items'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Images from '../libs/Imgs'
import classnames from 'classnames'

let {Sword, Dagger, Shield, Armor, Wand } = Images

export default class CharacterView extends Component {
  constructor (props) {
    super(props)
    this.togglemod = this.togglemod.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      modal: false,
      activeTab: '1',

      username: 'sTor-Lazze', // user.username
      name: 'Lasse', // user.name
      lastname: 'Kroner', // user.lastname
      email: 'Lasse@kroner.iDid', // user.email

      sword: '+25',
      blockChance: '5%',
      magic: '+10'

    }
  }

  togglemod () {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggle (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button style={{width: '10%', position: 'absolute'}} color="success" onClick={this.togglemod}>{this.props.buttonLabel}Menu</Button>
        <Modal isOpen={this.state.modal} togglemod={this.togglemod} className={this.props.className}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1') }}
              >
                My Account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2') }}
              >
                Skillz
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3') }}
              >
                Inventory
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4') }}
              >
                Leaderboard
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <ModalHeader style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}toggle={this.toggle}>My Account</ModalHeader>
              <br />
              <ul style={{listStyle: 'none'}}>
                <li><p>USERNAME: {this.state.username}</p> </li>
                <li><p>FIRST NAME: {this.state.name}</p></li>
                <li><p>LAST NAME: {this.state.lastname}</p></li>
                <li><p>EMAIL: {this.state.email}</p></li>
              </ul>
            </TabPane>
            <TabPane tabId="2">
              <ModalHeader toggle={this.toggle}>Skillz</ModalHeader>
              <br/>
              <ul style={{listStyle: 'none'}}>
                <li><p>MEELE DAMAGE: {this.state.sword}</p> </li>
                <li><p>BLOCK CHANCE: {this.state.blockChance}</p></li>
                <li><p>SPELL DAMAGE: {this.state.magic}</p></li>
              </ul>
            </TabPane>
            <TabPane tabId="3">
              <ModalHeader toggle={this.toggle}>Inventory</ModalHeader>
              <br/>
              <ul style={{listStyle: 'none'}}>
                <li>
                  <img style={{width: '40px', height: '40px'}} src={Sword} />
                  <img style={{width: '40px', height: '40px'}} src={Dagger} />
                  <img style={{width: '40px', height: '40px'}} src={Wand} />
                </li>
                <br />
                <li>
                  <img style={{width: '40px', height: '40px'}} src={Armor} />
                  <img style={{width: '40px', height: '40px'}} src={Shield} />
                </li>

              </ul>
            </TabPane>
            <TabPane tabId="4">
              <ModalHeader toggle={this.toggle}>Leaderboard</ModalHeader>
              <br/>
              <table className="table">
                <thead>
                  <tr>
                    <th>Account-ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001</td>
                    <td>Ted</td>
                    <td>Gärestad</td>
                    <td>1200</td>
                  </tr>
                  <tr>
                    <td>002</td>
                    <td>Olof</td>
                    <td>Palme</td>
                    <td>850</td>
                  </tr>
                  <tr>
                    <td>003</td>
                    <td>Larry</td>
                    <td>Page</td>
                    <td>660</td>
                  </tr>
                </tbody>
              </table>

            </TabPane>

          </TabContent>
          <ModalFooter>
            <Button color="danger" onClick={this.togglemod} data-dismiss="modal">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
