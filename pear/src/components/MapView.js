import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import {Modal, Button} from 'reactstrap'
import EnemyComponent from './EnemyComponent'
import Pinjump from './Pinjump'
import Markers from './Markers'
import Images from '../libs/Imgs'
import PlayerComponent from './PlayerComponent'
import Coordinates from '../assets/json/coordinates'
import WinnerPopUp from './WinnerPopUp'

let {Monster} = Images

class MapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeMonsterName: undefined,
      activeMonsterAvatar: undefined,
      activeMonsterCoins: undefined,
      monsterMarkers: [],
      didSetMonsters: false,
      fightViewOpened: false,
      winnerIsSet: false,
      playerWin: false,
      monsterWin: false,
      enemyHP: 100,
      playerHP: 100,
      monstersKilled: this.props.setUser.monstersKilled,
      user: this.props.setUser,
      coins: this.props.setUser.coins,
      playerTurn: false,
      monsterTurn: false,
      displayDmg: undefined,
      displayReduction: undefined,
      waitForMonster: false
    }
  }

  componentDidMount () {
    this.setMonsters()
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  render () {
    let {monsterMarkers, fightViewOpened, winnerIsSet, enemyHP, playerHP, activeMonsterName,
      activeMonsterAvatar, user, playerTurn, monsterTurn, waitForMonster} = this.state
    let {isGeolocationAvailable, isGeolocationEnabled, coords} = this.props
    if (!user) return <div/>
    if (!isGeolocationAvailable) return <Pinjump />// <div style={styles.infoMsg}>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) return <Pinjump />// <div style={styles.infoMsg}>You must enable Geolocation to play this game!</div>
    if (!coords) return <Pinjump />

    return <div>
      <Markers
        lng={coords.longitude}
        lat={coords.latitude}
        toggleFightView={this.toggleFightView}
        accuracy={coords.accuracy}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCerbPPD0V2qOoQC1QJbNSlxfUWsxYAmo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={styles.mapStyle} />}
        containerElement={<div style={styles.mapStyle} />}
        mapElement={<div style={styles.mapStyle} />}
        markers={monsterMarkers}
      />
      <Modal isOpen={fightViewOpened} togglemod={this.toggleFightView}>
        <div style={styles.wrapper}>
          <EnemyComponent enemyHP={enemyHP} name={activeMonsterName} avatar={activeMonsterAvatar}/>
          <div style={styles.console}>
            {winnerIsSet ? this.renderWinner() : <div />}
            {!winnerIsSet && playerTurn ? this.logDmgGiven() : <div />}
            {!winnerIsSet && monsterTurn ? this.logDmgTaken() : <div />}
          </div>
          <PlayerComponent playerHP={playerHP} username={user.username} avatar={user.avatar}/>
          <div style={styles.buttonWrapper}>
            {winnerIsSet
              ? <Button onClick={this.toggleFightView} color='success' style={styles.buttonStyle}>Continue</Button>
              : <Button onClick={this.playerAttack} disabled={waitForMonster} color='danger' style={styles.buttonStyle}>Attack</Button>}
          </div>
        </div>
      </Modal>
    </div>
  }

  // TODO: randomize coindrop (depending on monster)  // this.setActiveMonsterCoins(id)
  toggleFightView = (id) => {
    let {fightViewOpened} = this.state
    if (fightViewOpened === false) return this.initFight(id)
    if (fightViewOpened === true) return this.resetFight(id)
  }

  initFight = (id) => {
    let {fightViewOpened} = this.state
    this.setState({
      fightViewOpened: !fightViewOpened,
      activeMonsterName: this.setActiveMonsterName(id),
      activeMonsterAvatar: this.setActiveMonsterAvatar(id),
      waitForMonster: false,
      playerWin: false,
      monsterWin: false,
      activeMonsterID: id
    })
  }

  resetFight = () => {
    let {fightViewOpened} = this.state
    this.setState({
      fightViewOpened: !fightViewOpened,
      enemyHP: 100,
      playerHP: 100,
      winnerIsSet: false,
      playerTurn: false,
      monsterTurn: false,
      playerWin: false,
      monsterWin: false
    })
  }

  playerWin = (id) => {
    let {monstersKilled, coins} = this.state
    let {updateUser} = this.props
    this.killCounter()
    this.incCoins(id)
    this.removeMonster(id)
    this.setState({winnerIsSet: true, playerWin: true})
    updateUser(monstersKilled, coins)
  }

  playerLoose = () => {
    this.setState({winnerIsSet: true, monsterWin: true, waitForMonster: true})
  }

  setActiveMonsterName = (id) => {
    let {monsterMarkers} = this.state
    //console.log(monsterMarkers[id])
    return monsterMarkers[id].name
  }
  setActiveMonsterAvatar = (id) => {
    let {monsterMarkers} = this.state
    return monsterMarkers[id].icon
  }

  renderWinner = () => {
    let {playerWin, monsterWin} = this.state
    if (playerWin === true) return <WinnerPopUp goldDropped={2} />
    if (monsterWin === true) return <div style={styles.winnerText}>YOU LOOSE!</div>
  }

  logDmgGiven = () => {
    let {displayDmg, displayReduction} = this.state
    if (displayReduction <= 0) return <div style={styles.logDmgGiven}>You hit for {displayDmg} dmg!</div>
    if (displayReduction) return <div style={styles.logDmgGiven}> You hit for {displayDmg} dmg! ({displayReduction} dmg mitigated)</div>
  }

  logDmgTaken = () => {
    let {displayDmg, displayReduction} = this.state
    if (displayReduction <= 0) return <div style={styles.logDmgTaken}>You took {displayDmg} dmg!</div>
    if (displayReduction) return <div style={styles.logDmgTaken}> You took {displayDmg} dmg! ({displayReduction} dmg mitigated)</div>
  }

  calcPlayerAttack = () => {
    let {attack} = this.props
    let baseDmg = 15
    let attackDmg = 1 + (attack / 100)
    let maxDmg = baseDmg * attackDmg
    let rawDmgGiven = Math.ceil(Math.floor(Math.random() * (maxDmg - baseDmg)) + baseDmg)
    return rawDmgGiven
  }

  calcMonsterAttack = () => {
    let {activeMonsterName} = this.state
    let baseDmg = 12
    let attackDmg = 1.25
    let maxDmg = baseDmg * attackDmg
    let rawDmgTaken = Math.ceil(Math.floor(Math.random() * (maxDmg - baseDmg)) + baseDmg)
    if (activeMonsterName === 'Boss') return rawDmgTaken + 5
    return rawDmgTaken
  }

  clacPlayerDmgReduction = () => {
    let {block} = this.props
    let baseReduction = 5
    let itemReduction = block
    let maxReduction = baseReduction + itemReduction
    let playerDmgReduction = Math.ceil((Math.floor(Math.random() * (maxReduction - baseReduction)) + baseReduction) / 5)
    return playerDmgReduction
  }

  clacMonsterDmgReduction = () => {
    let baseReduction = 5
    let itemReduction = 10
    let maxReduction = baseReduction + itemReduction
    let dmgReduction = Math.ceil((Math.floor(Math.random() * (maxReduction - baseReduction)) + baseReduction) / 5)
    return dmgReduction
  }

  calcPlayerDmgTaken = () => {
    let rawDmgTaken = this.calcMonsterAttack()
    let playerDmgReduction = this.clacPlayerDmgReduction()
    let playerDmgTakenWithReduction = rawDmgTaken - playerDmgReduction
    if (playerDmgReduction > rawDmgTaken) return 0
    return playerDmgTakenWithReduction
  }

  playerAttack = () => {
    let {enemyHP, playerHP} = this.state
    let rawDmgGiven = this.calcPlayerAttack()
    // let rawDmgTaken = this.calcMonsterAttack()
    let playerDmgReduction = this.clacPlayerDmgReduction()
    let monsterDmgReduction = this.clacMonsterDmgReduction()
    let playerDmgTakenWithReduction = this.calcPlayerDmgTaken()
    let monsterDmgTakenWithReduction = rawDmgGiven - monsterDmgReduction
    if (enemyHP > 0 || enemyHP !== 0) {
      this.setState({playerTurn: true,
        monsterTurn: false,
        enemyHP: enemyHP - monsterDmgTakenWithReduction,
        displayDmg: monsterDmgTakenWithReduction,
        displayReduction: monsterDmgReduction,
        waitForMonster: true
      })
    }
    if (enemyHP === 0 || monsterDmgTakenWithReduction > enemyHP || monsterDmgTakenWithReduction === enemyHP) return this.playerWin(this.state.activeMonsterID)
    setTimeout(() => {
      if (playerHP < 0 || playerDmgTakenWithReduction > playerHP) return this.playerLoose()
      if (playerHP > 0) {
        this.setState({playerTurn: false,
          monsterTurn: true,
          playerHP: playerHP - playerDmgTakenWithReduction,
          displayDmg: playerDmgTakenWithReduction,
          displayReduction: playerDmgReduction,
          waitForMonster: false
        })
      }
    }, 1500)
  }

  killCounter = () => {
    let {monstersKilled} = this.state
    this.setState({monstersKilled: monstersKilled + 1})
  }

  incCoins = () => {
    let {coins} = this.state
    this.setState({coins: coins + 2})
  }

  removeMonster = (id) => {
    let {monsterMarkers} = this.state
    monsterMarkers[id].alive = false
    this.setState({monsterMarkers: monsterMarkers})
  }

  // TODO: Respawn monsters! for loop setState({markers -> Alive})

  setMonsters = (nextProps, nextState) => {
    let {didSetMonsters} = this.state
    if (didSetMonsters) return
    let mapCoordinates = {Coordinates}
    let x = []
    let monstersToRender = []
    console.log(mapCoordinates.Coordinates.features);
    for (var {properties: {Name: n, gx_media_links: img}, geometry: {coordinates: [c, d]}} of mapCoordinates.Coordinates.features) { // console.log('Name: ' + n + ', Father: ' + c + " " + d);
      x.push({name: n, latitude: d, longitude: c, icon: img})
    }
    for (var i = 0; i < x.length; i++) {
      monstersToRender.push({id: i, latitude: x[i].latitude, longitude: x[i].longitude, icon: x[i].icon, name: x[i].name, alive: true})
    }
    this.setState({monsterMarkers: monstersToRender, didSetMonsters: true})
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  userDecisionTimeout: 5000,
  watchPosition: true
})(MapView)

let styles = {
  mapStyle: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    zIndex: -1000
  },
  infoMsg: {
    marginTop: '200px',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  console: {
    height: 'auto',
    minHeight: '40px'
  },
  logDmgGiven: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'blue'
  },
  logDmgTaken: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'red'
  },
  closeButton: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginLeft: '20px'
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    display: 'flex',
    flex: '1',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: '0 5px'
  },
  buttonStyle: {
    width: '30%'
  }
}
