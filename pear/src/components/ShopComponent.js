import React, {Component} from 'react'
// eslint-disable-next-line
import {Nav, NavLink, NavItem, ModalHeader, TabContent, TabPane, Table, Button} from 'reactstrap'
import classnames from 'classnames'
import {itemWeapon, itemShield, itemHead, itemChest, itemLegs, itemFeet} from './Items'

export default class ShopComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: '1',
      user: this.props.user
    }
  }

  render () {
    let {user, activeTab} = this.state
    let {reg} = user
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
          <NavItem>
            <NavLink className={classnames({ active: activeTab === '6' })} onClick={() => { this.toggle('6') }}>
          Feet
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Weapons</ModalHeader>
            {reg === 'true' ? this.renderWeapons() : reg === 'false' ? this.infoMsg() : <div />}
          </TabPane>
          <TabPane tabId='2'>
            <ModalHeader toggle={this.toggle}>Shields</ModalHeader>
            {reg === 'true' ? this.renderShields() : reg === 'false' ? this.infoMsg() : <div />}
          </TabPane>
          <TabPane tabId='3'>
            <ModalHeader toggle={this.toggle}>Head</ModalHeader>
            {reg === 'true' ? this.renderHeads() : reg === 'false' ? this.infoMsg() : <div />}
            <div/>
          </TabPane>
          <TabPane tabId='4'>
            <ModalHeader toggle={this.toggle}>Chest</ModalHeader>
            {reg === 'true' ? this.renderChests() : reg === 'false' ? this.infoMsg() : <div />}
            <div/>
          </TabPane>
          <TabPane tabId='5'>
            <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Legs</ModalHeader>
            {reg === 'true' ? this.renderLegs() : reg === 'false' ? this.infoMsg() : <div />}
            <div/>
          </TabPane>
          <TabPane tabId='6'>
            <ModalHeader style={styles.modalHeader} toggle={this.toggle}>Feet</ModalHeader>
            {reg === 'true' ? this.renderFeet() : reg === 'false' ? this.infoMsg() : <div />}
            <div/>
          </TabPane>
        </TabContent>
      </div>
    )
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  infoMsg = () => {
    return <p style={styles.infoMsg}>Register now to get full access to all the epic items!</p>
  }

  renderWeapons = () => {
    return (
      <Table style={styles.table}>
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
            <td style={styles.firstData}><img src={itemWeapon[0].img} style={styles.listItemPic} alt='item' /></td>
            <td>{itemWeapon[0].name}</td>
            <td>+ {itemWeapon[0].dmg} % dmg</td>
            <td>{itemWeapon[0].cost} c</td>
            <td><Button onClick={this.props.buyWeapon} style={styles.buyButton}>Buy</Button></td>
          </tr>
        </tbody>
      </Table>
    )
  }

  renderShields = () => {
    return (
      <Table style={styles.table}>
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
            <td style={styles.firstData}><img src={itemShield[0].img} style={styles.listItemPic} alt='item' /></td>
            <td>{itemShield[0].name}</td>
            <td>+ {itemShield[0].block} armor</td>
            <td>{itemShield[0].cost} c</td>
            <td><Button onClick={this.props.buyShield} style={styles.buyButton}>Buy</Button></td>
          </tr>
        </tbody>
      </Table>
    )
  }

  renderHeads = () => {
    return (
      <Table style={styles.table}>
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
            <td style={styles.firstData}><img src={itemHead[0].img} style={styles.listItemPic} alt='item' /></td>
            <td>{itemHead[0].name}</td>
            <td>+ {itemHead[0].block} armor</td>
            <td>{itemHead[0].cost} c</td>
            <td><Button onClick={this.props.buyHead} style={styles.buyButton}>Buy</Button></td>
          </tr>
        </tbody>
      </Table>
    )
  }

  renderChests = () => {
    return (
      <Table style={styles.table}>
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
            <td style={styles.firstData}><img src={itemChest[0].img} style={styles.listItemPic} alt='item' /></td>
            <td>{itemChest[0].name}</td>
            <td>+ {itemChest[0].block} armor</td>
            <td>{itemChest[0].cost} c</td>
            <td><Button onClick={this.props.buyChest} style={styles.buyButton}>Buy</Button></td>
          </tr>
        </tbody>
      </Table>
    )
  }

  renderLegs = () => {
    return (
      <Table style={styles.table}>
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
            <td style={styles.firstData}><img src={itemLegs[0].img} style={styles.listItemPic} alt='item' /></td>
            <td>{itemLegs[0].name}</td>
            <td>+ {itemLegs[0].block} armor</td>
            <td>{itemLegs[0].cost} c</td>
            <td><Button onClick={this.props.buyLegs} style={styles.buyButton}>Buy</Button></td>
          </tr>
        </tbody>
      </Table>
    )
  }

  renderFeet = () => {
    return (
      <Table style={styles.table}>
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
            <td style={styles.firstData}><img src={itemFeet[0].img} style={styles.listItemPic} alt='item' /></td>
            <td>{itemFeet[0].name}</td>
            <td>+ {itemFeet[0].block} armor</td>
            <td>{itemFeet[0].cost} c</td>
            <td><Button onClick={this.props.buyFeet} style={styles.buyButton}>Buy</Button></td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

let styles = {
  table: {
    padding: 0,
    margin: 0
  },
  firstData: {
    padding: 0,
    margin: 0,
    verticalAlign: 'middle'
  },
  buyButton: {
    margin: 0,
    padding: '5px 10px',
    verticalAlign: 'middle'
  },
  listItemPic: {
    width: '30px'
  },
  infoMsg: {
    fontSize: '20px',
    color: 'green',
    padding: '20px'
  }
}
