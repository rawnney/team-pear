import React, {Component} from 'react'
// eslint-disable-next-line
import {Nav, NavLink, NavItem, ModalHeader, TabContent, TabPane, Table, Button} from 'reactstrap'
import classnames from 'classnames'
import {itemWeapon, itemShield, itemHead, itemChest, itemLegs, itemFeet} from '../libs/Items'

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
    let {buyWeapon} = this.props
    let weapons = itemWeapon.map((itemWeapon, i) => {
      return (
        <tr key={i}>
          <td style={styles.firstData}><img src={itemWeapon.img} style={styles.listItemPic} alt='item' /></td>
          <td style={styles.tableData}>{itemWeapon.name}</td>
          <td style={styles.tableData}>+{itemWeapon.dmg}%</td>
          <td style={styles.tableData}>{itemWeapon.cost}c</td>
          <td style={styles.tableData}><Button onClick={() => buyWeapon(i)} style={styles.buyButton}>Buy</Button></td>
        </tr>
      )
    })
    return (
      <Table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}></th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Attack</th>
            <th style={styles.th}>Cost</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {weapons}
        </tbody>
      </Table>
    )
  }

  renderShields = () => {
    let {buyShield} = this.props
    let shields = itemShield.map((itemShield, i) => {
      return (
        <tr key={i}>
          <td style={styles.firstData}><img src={itemShield.img} style={styles.listItemPic} alt='item' /></td>
          <td style={styles.tableData}>{itemShield.name}</td>
          <td style={styles.tableData}>+{itemShield.block}</td>
          <td style={styles.tableData}>{itemShield.cost}c</td>
          <td style={styles.tableData}><Button onClick={() => buyShield(i)} style={styles.buyButton}>Buy</Button></td>
        </tr>
      )
    })
    return (
      <Table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}></th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Armor</th>
            <th style={styles.th}>Cost</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {shields}
        </tbody>
      </Table>
    )
  }

  renderHeads = () => {
    let {buyHead} = this.props
    let heads = itemHead.map((itemHead, i) => {
      return (
        <tr key={i}>
          <td style={styles.firstData}><img src={itemHead.img} style={styles.listItemPic} alt='item' /></td>
          <td style={styles.tableData}>{itemHead.name}</td>
          <td style={styles.tableData}>+{itemHead.block}</td>
          <td style={styles.tableData}>{itemHead.cost}c</td>
          <td style={styles.tableData}><Button onClick={() => buyHead(i)} style={styles.buyButton}>Buy</Button></td>
        </tr>
      )
    })
    return (
      <Table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}></th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Armor</th>
            <th style={styles.th}>Cost</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {heads}
        </tbody>
      </Table>
    )
  }

  renderChests = () => {
    let {buyChest} = this.props
    let chest = itemChest.map((itemChest, i) => {
      return (
        <tr key={i}>
          <td style={styles.firstData}><img src={itemChest.img} style={styles.listItemPic} alt='item' /></td>
          <td style={styles.tableData}>{itemChest.name}</td>
          <td style={styles.tableData}>+{itemChest.block}</td>
          <td style={styles.tableData}>{itemChest.cost}c</td>
          <td style={styles.tableData}><Button onClick={() => buyChest(i)} style={styles.buyButton}>Buy</Button></td>
        </tr>
      )
    })
    return (
      <Table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}></th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Armor</th>
            <th style={styles.th}>Cost</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {chest}
        </tbody>
      </Table>
    )
  }

  renderLegs = () => {
    let {buyLegs} = this.props
    let legs = itemLegs.map((itemLegs, i) => {
      return (
        <tr key={i}>
          <td style={styles.firstData}><img src={itemLegs.img} style={styles.listItemPic} alt='item' /></td>
          <td style={styles.tableData}>{itemLegs.name}</td>
          <td style={styles.tableData}>+{itemLegs.block}</td>
          <td style={styles.tableData}>{itemLegs.cost}c</td>
          <td style={styles.tableData}><Button onClick={() => buyLegs(i)} style={styles.buyButton}>Buy</Button></td>
        </tr>
      )
    })
    return (
      <Table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}></th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Armor</th>
            <th style={styles.th}>Cost</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {legs}
        </tbody>
      </Table>
    )
  }

  renderFeet = () => {
    let {buyFeet} = this.props
    let feet = itemFeet.map((itemFeet, i) => {
      return (
        <tr key={i}>
          <td style={styles.firstData}><img src={itemFeet.img} style={styles.listItemPic} alt='item' /></td>
          <td style={styles.tableData}>{itemFeet.name}</td>
          <td style={styles.tableData}>+{itemFeet.block}</td>
          <td style={styles.tableData}>{itemFeet.cost}c</td>
          <td style={styles.tableData}><Button onClick={() => buyFeet(i)} style={styles.buyButton}>Buy</Button></td>
        </tr>
      )
    })
    return (
      <Table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}></th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Armor</th>
            <th style={styles.th}>Cost</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {feet}
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
    padding: '15px',
    margin: 0,
    verticalAlign: 'middle'
  },
  buyButton: {
    margin: 0,
    padding: '5px 10px',
    verticalAlign: 'middle',
    maxWidth: '50px',
    maxHeight: '35px'
  },
  listItemPic: {
    width: '35px',
    height: '35px'
  },
  infoMsg: {
    fontSize: '20px',
    color: 'green',
    padding: '20px'
  },
  tableData: {
    verticalAlign: 'middle',
    paddingLeft: '0px'
  },
  th: {
    paddingLeft: '0px'
  }
}
