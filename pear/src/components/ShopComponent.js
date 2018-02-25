import React, {Component} from 'react'
import {Nav, NavLink, NavItem, ModalHeader, TabContent, TabPane, Table, Button} from 'reactstrap'
import classnames from 'classnames'
import Images from '../libs/Imgs'
let {Sword, Shield} = Images

export default class ShopComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: '1'
    }
  }

  render () {
    let {activeTab} = this.state
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { this.toggle('1') }}>
          Weapons
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { this.toggle('2') }}>
          Shields
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { this.toggle('3') }}>
          Head
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { this.toggle('4') }}>
          Chest
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => { this.toggle('5') }}>
          Legs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Weapons</ModalHeader>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Bonus</th>
                  <th>Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><img src={Sword} style={styles.listItemPic}/></td>
                  <td>Longsword</td>
                  <td>+25 % dmg</td>
                  <td>10 c</td>
                  <td><Button onClick={this.buyItem} disable={this.checkCoin} style={styles.buyButton}>Buy</Button></td>
                </tr>
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId='2'>
            <ModalHeader toggle={this.toggle}>Shields</ModalHeader>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Bonus</th>
                  <th>Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><img src={Shield} style={styles.listItemPic}/></td>
                  <td>Longsword</td>
                  <td>+ 15 Armor</td>
                  <td>10 c</td>
                  <td><Button onClick={this.buyItem} disable={this.checkCoin} style={styles.buyButton}>Buy</Button></td>
                </tr>
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId='3'>
            <ModalHeader toggle={this.toggle}>Head</ModalHeader>
            <div/>
          </TabPane>
          <TabPane tabId='4'>
            <ModalHeader toggle={this.toggle}>Chest</ModalHeader>
            <div/>
          </TabPane>
          <TabPane tabId='5'>
            <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Legs</ModalHeader>
            <div/>
          </TabPane>
        </TabContent>
      </div>
    )
  }

  checkCoin = () => {
    let {user} = this.state
    let {itemCost} = this.props
    if (user.coins < itemCost) this.setState({disable: true})
  }

  buyItem = () => {
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
}

let styles = {
  none: {
    listStyle: 'none',
    paddingLeft: '0'
  },
  buyButton: {
    margin: 0,
    padding: '5px 10px'
  },
  listItemPic: {
    width: '30px'
  }
}
