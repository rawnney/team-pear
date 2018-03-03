import React, { Component } from 'react'
import {itemWeapon, itemShield, itemChest, itemHead, itemFeet, itemLegs} from '../libs/Items'
import MapView from './MapView'
import CharacterView from './CharacterView'
import Home from './Home'
import axios from 'axios'
import {API_UPDATE_KILLS, API_UPDATE_COINS, API_WEAPON, API_SHIELD, API_HEAD, API_CHEST, API_FEET, API_LEGS} from '../libs/Const'

export default class GameView extends Component<Props, State> {
  innerRef
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: undefined
    }
  }

  componentDidMount () {
    setInterval(() => {
    this.getLocation()
    }, 5000)
  }

  render () {
    let {loggedIn, user} = this.state
    let notLoggedIn = <Home setUser={this.setUser} setLoggedIn={this.setLoggedIn}/>
    if (!loggedIn || !user) return notLoggedIn
    return <div>
      <CharacterView
        setUser={user}
        signOut={this.signOut}
        buyWeapon={this.buyWeaponAPI}
        buyShield={this.buyShieldAPI}
        buyHead={this.buyHeadAPI}
        buyChest={this.buyChestAPI}
        buyLegs={this.buyLegsAPI}
        buyFeet={this.buyFeetAPI}
      />
      <MapView
        ref={this.setRef}
        setUser={user}
        updateUser={this.updateUser}
        attack={user.attack}
        block={user.block}
      />
    </div>
  }

  getLocation = () => {
    if (!this.innerRef || !this.innerRef.getLocation) return
    this.innerRef.getLocation()
  }

  setRef = (ref: *) => this.innerRef = ref
  setLoggedIn = (loggedIn) => this.setState({loggedIn: true})
  signOut = () => this.setState({loggedIn: false, user: null})
  setUser = (user) => this.setState({user})

  updateUser = (monstersKilled, coins) => {
    let {user} = this.state
    let {iduser} = user
    this.setState({user: {...user, monstersKilled: monstersKilled + 1, coins: coins + 2}})
    axios.put(API_UPDATE_KILLS, {monstersKilled: monstersKilled + 1, iduser})
    axios.put(API_UPDATE_COINS, {coins: coins + 2, iduser})
    console.log('monstersKilled' + monstersKilled, 'coins' + coins)
  }

  //  SHOP ITEMS
  buyWeaponAPI = (i) => {
    let {user} = this.state
    let {iduser, reg, coins, weapon} = user
    let newWeapon = itemWeapon[i]
    if (reg === 'false') return
    if (coins < newWeapon.cost) return
    if (weapon === newWeapon.id) return
    this.setState({user: {...user, weapon: newWeapon.id, attack: newWeapon.dmg, coins: coins - newWeapon.cost}})
    axios.put(API_WEAPON, {weapon: newWeapon.id, attack: newWeapon.dmg, iduser}).then(() => {
      axios.put(API_UPDATE_COINS, {coins: coins - newWeapon.cost, iduser})
      console.log('You bought ' + newWeapon.name + ' for ' + newWeapon.cost)
    })
  }

  buyShieldAPI = (i) => {
    let {user} = this.state
    let {iduser, reg, coins, shield, block} = user
    let newShield = itemShield[i]
    if (reg === 'false') return
    if (coins < newShield.cost) return
    if (shield === newShield.id) return
    this.setState({user: {...user, shield: newShield.id, block: block + newShield.block, coins: coins - newShield.cost}})
    axios.put(API_SHIELD, {shield: newShield.id, block: block + newShield.block, iduser}).then(() => {
      axios.put(API_UPDATE_COINS, {coins: coins - newShield.cost, iduser})
      console.log('You bought ' + newShield.name + ' for ' + newShield.cost)
    })
  }

  buyHeadAPI = (i) => {
    let {user} = this.state
    let {iduser, reg, coins, head, block} = user
    let newHead = itemHead[i]
    if (reg === 'false') return
    if (coins < newHead.cost) return
    if (head === newHead.id) return
    this.setState({user: {...user, head: newHead.id, block: block + newHead.block, coins: coins - newHead.cost}})
    axios.put(API_HEAD, {head: newHead.id, block: block + newHead.block, iduser}).then(() => {
      axios.put(API_UPDATE_COINS, {coins: coins - newHead.cost, iduser})
      console.log('You bought ' + newHead.name + ' for ' + newHead.cost)
    })
  }

  buyChestAPI = (i) => {
    let {user} = this.state
    let {iduser, reg, coins, chest, block} = user
    let newChest = itemChest[i]
    if (reg === 'false') return
    if (coins < newChest.cost) return
    if (chest === newChest.id) return
    this.setState({user: {...user, chest: newChest.id, block: block + newChest.block, coins: coins - newChest.cost}})
    axios.put(API_CHEST, {chest: newChest.id, block: block + newChest.block, iduser}).then(() => {
      axios.put(API_UPDATE_COINS, {coins: coins - newChest.cost, iduser})
      console.log('You bought ' + newChest.name + ' for ' + newChest.cost)
    })
  }

  buyLegsAPI = (i) => {
    let {user} = this.state
    let {iduser, reg, coins, legs, block} = user
    let newLegs = itemLegs[i]
    if (reg === 'false') return
    if (coins < newLegs.cost) return
    if (legs === newLegs.id) return
    this.setState({user: {...user, legs: newLegs.id, block: block + newLegs.block, coins: coins - newLegs.cost}})
    axios.put(API_LEGS, {legs: newLegs.id, block: block + newLegs.block, iduser}).then(() => {
      axios.put(API_UPDATE_COINS, {coins: coins - newLegs.cost, iduser})
      console.log('You bought ' + newLegs.name + ' for ' + newLegs.cost)
    })
  }

  buyFeetAPI = (i) => {
    let {user} = this.state
    let {iduser, reg, coins, feet, block} = user
    let newFeet = itemFeet[i]
    if (reg === 'false') return
    if (coins < newFeet.cost) return
    if (feet === newFeet.id) return
    this.setState({user: {...user, feet: newFeet.id, block: block + newFeet.block, coins: coins - newFeet.cost}})
    axios.put(API_FEET, {feet: newFeet.id, block: block + newFeet.block, iduser}).then(() => {
      axios.put(API_UPDATE_COINS, {coins: coins - newFeet.cost, iduser})
      console.log('You bought ' + newFeet.name + ' for ' + newFeet.cost)
    })
  }
}
