import React, { Component } from 'react'

// import Items from './items'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap'
import Images from '../libs/Imgs'
import classnames from 'classnames'
import 'whatwg-fetch'

let { Sword, Dagger, Shield, Armor, Wand } = Images

export default class CharacterView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      activeTab: '1',
      Usersr: [],

      lastname: 'Kroner', // user.lastname
      emaill: undefined, // user.email

      sword: '+25',
      blockChance: '5%',
      magic: '+10',
      pictures: [],
      names: [],
      last: [],
      usernamee: undefined,
      teamm: undefined

    }
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

  componentDidMount () {
    fetch('http://localhost:3000/api/users/12')
      .then(Users => {
        return Users.json()
      }).then(data => {
        let usernamee = data.Users.map((las) => {
          return (
            <div key={las.Users}>
              <p>{las.username}</p>
            </div>

          )
        })
        let teamm = data.Users.map((las) => {
          return (
            <div key={las.Users}>
              <p>{las.team}</p>
            </div>

          )
        })
        let emaill = data.Users.map((las) => {
          return (
            <div key={las.Users}>
              <p>{las.email}</p>
            </div>

          )
        })
        this.setState({teamm: teamm})
        this.setState({emaill: emaill})
        this.setState({usernamee: usernamee})
      })
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
                <li><p>USERNAME: {this.state.usernamee}</p> </li>
                <li>TEAM: {this.state.teamm}</li>
                <li><p>EMAIL: {this.state.emaill}</p></li>
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
                  {this.state.names}
                  {this.state.pictures}
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

          </TabContent>
          <ModalFooter>
            <Button color="danger" onClick={this.togglemod} data-dismiss="modal">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
