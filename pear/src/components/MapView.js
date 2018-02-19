
import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import {Modal, Button} from 'reactstrap'
import fakeServerData from '../fakeServerData'
import EnemyComponent from './EnemyComponent'
import Pinjump from './Pinjump';
import Markers from './Markers'
import Images from '../libs/Imgs'
import PlayerComponent from './PlayerComponent'
let {QMark} = Images // Monster, Robin

type Props = {
  coords: Object,
  isGeolocationAvailable: boolean,
  isGeolocationEnabled: boolean
}

type State = {
  monsterMarkers: Array<*>,
  didSetMonsters: boolean,
  fightViewOpened: boolean,
  monsterCount: Number,
  winnerIsSet: false
}

class MapView extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      monster: fakeServerData.monster,
      activeMonsterName: undefined,
      activeMonsterAvatar: undefined,
      activeMonsterCoins: undefined,
      monsterMarkers: [],
      didSetMonsters: false,
      fightViewOpened: false,
      winnerIsSet: false,
      enemyHP: 100,
      playerHP: 100,
      monsterCount: fakeServerData.monster.length,
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

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {
    this.setMonsters(nextProps, nextState)
  }

  render () {
    let {monsterMarkers, fightViewOpened, winnerIsSet, enemyHP, playerHP, activeMonsterName,
       activeMonsterAvatar, user, playerTurn, monsterTurn, waitForMonster} = this.state
    let {coords, isGeolocationAvailable, isGeolocationEnabled} = this.props
    if (!user) return <div/>
    if (!isGeolocationAvailable) return <div style={styles.infoMsg}>Your browser does not support Geolocation</div>
    if (!isGeolocationEnabled) return <div style={styles.infoMsg}>You must enable Geolocation to play this game!</div>
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
          {winnerIsSet ? this.renderExit() : <div />}
          <EnemyComponent enemyHP={enemyHP} name={activeMonsterName} avatar={activeMonsterAvatar}/>
            <div style={styles.console}>
          {winnerIsSet ? this.renderWinner() : <div />}
          {!winnerIsSet && playerTurn ? this.logDmgGiven() : <div />}
          {!winnerIsSet && monsterTurn ? this.logDmgTaken() : <div />}
            </div>
          <PlayerComponent playerHP={playerHP} username={user.username} avatar={user.avatar}/>
          <div style={styles.buttonWrapper}>
            <Button onClick={this.playerAttack} disabled={waitForMonster} color='danger' style={styles.buttonStyle}>Attack</Button>
            {/*<Button onClick={this.playerAttack} color='danger' style={styles.buttonStyle}>Attack</Button>*/}
          </div>
        </div>
      </Modal>
    </div>
  }

// TODO: randomize coindrop (depending on monster)  // this.setActiveMonsterCoins(id)
  toggleFightView = (id) => {
    let {fightViewOpened, enemyHP, playerHP} = this.state
    if (!fightViewOpened) return this.initFight(id)
    if (enemyHP === 0 || enemyHP < 0) return this.playerWin(id)
    if ( playerHP === 0 || playerHP < 0) return this.playerLoose(id)
  }

  playerWin = (id) => {
    let {monstersKilled, coins, fightViewOpened} = this.state
    let {updateUser} = this.props
    this.killCounter()
    this.incCoins(id)
    this.removeMonster(id)
    updateUser(monstersKilled, coins)
    this.setState({
      fightViewOpened: !fightViewOpened,
      enemyHP: 100,
      playerHP: 100,
      winnerIsSet: false,
      playerTurn: false,
      monsterTurn: false
    })
  }

  initFight = (id) => {
    let {fightViewOpened} = this.state
    this.setState({
      fightViewOpened: !fightViewOpened,
      activeMonsterName: this.setActiveMonsterName(id),
      activeMonsterAvatar: this.setActiveMonsterAvatar(id),
      waitForMonster: false
    })
  }

  playerLoose = () => {
    return <div style={styles.winnerText}>
    YOU ARE LOOSER, YOU SUCK SO HARD! ACCOUNT DELETED! LOL NOOB.
    </div>
  }

  setActiveMonsterName = (id) => {return fakeServerData.monster[id].monsterName}
  setActiveMonsterAvatar = (id) => {return fakeServerData.monster[id].monsterAvatar}
  // TODO: randomize coindrop  // setActiveMonsterCoins = (id) => {return fakeServerData.monster[id].coins}

  renderWinner = () => {
    return <div style={styles.winnerText}>
    YOU ARE WINNER!
    </div>
  }

  renderExit = () => {
    return <Button onClick={this.toggleFightView} style={styles.closeButton}>X</Button>
  }

  logDmgGiven = () => {
    let {displayDmg} = this.state
    return <div style={styles.logDmgGiven}>You hit for {displayDmg} dmg!</div>
  }

  logDmgTaken = () => {
    let {displayDmg, displayReduction} = this.state
    return <div style={styles.logDmgTaken}>
    You took {displayDmg} dmg!
    ({displayReduction} dmg mitigated)
    </div>
  }

  calcPlayerAttack = () => {
    let baseDmg = 10
    let attackDmg = 1.25
    let totalDmg = baseDmg * attackDmg
    let rawDmgGiven = Math.ceil(Math.floor(Math.random() * (totalDmg - baseDmg)) + baseDmg)
    return rawDmgGiven
  }

  calcMonsterAttack = () => {
    let baseDmg = 10
    let attackDmg = 1.25
    let totalDmg = baseDmg * attackDmg
    let rawDmgTaken = Math.ceil(Math.floor(Math.random() * (totalDmg - baseDmg)) + baseDmg)
    return rawDmgTaken
  }

  clacPlayerDmgReduction = () => {
    let baseReduction = 5
    let itemReduction = 15
    let maxReduction = baseReduction + itemReduction
    let dmgReduction = Math.ceil((Math.floor(Math.random() * (maxReduction - baseReduction)) + baseReduction) / 5)
    return dmgReduction
  }

  playerAttack = () => {
    let {enemyHP, playerHP} = this.state
    let rawDmgGiven = this.calcPlayerAttack()
    let rawDmgTaken = this.calcMonsterAttack()
    let dmgReduction = this.clacPlayerDmgReduction()
    let dmgWithReduction = rawDmgTaken - dmgReduction
    if (enemyHP > 0 || enemyHP !== 0) {
      this.setState({playerTurn: false, monsterTurn: true, enemyHP: enemyHP - rawDmgGiven, displayDmg: rawDmgGiven, waitForMonster: true})}
    if (enemyHP === 0 || rawDmgGiven > enemyHP) return this.setState({winnerIsSet: true})
        setTimeout(() => {
        if (playerHP < 0 || rawDmgTaken > playerHP) this.setState({winnerIsSet: true})
        if (playerHP > 0 ) this.setState({playerTurn: true, monsterTurn: false,
          playerHP: playerHP - dmgWithReduction, displayDmg: dmgWithReduction, displayReduction: dmgReduction, waitForMonster: false})
      }, 1500)
  }

  killCounter = () => {
    let {monstersKilled} = this.state
    this.setState({monstersKilled: monstersKilled + 1})
  }

  incCoins = () => {
    let {coins} = this.state
    this.setState({coins: coins + 2 })
  }

  removeMonster = (id, latitude, longitude) => {
    let {monsterMarkers, monsterCount} = this.state
      monsterMarkers.splice(id, 1)
    this.setState({monsterMarkers: monsterMarkers, monsterCount: monsterCount -1})
  }

// TODO: Respawn monsters!

  // respawnMonster = () => {
  //   let {monsterCount, monsterMarkers} = this.state
  //   let addMonsters = newMonsterMarkers
  //   if (monsterCount > 5) return addMonster((monsterMarkers) => {
  //   })
  // }

  setMonsters = (nextProps, nextState) => {
    let {monsterCount} = this.state
    let {latitude, longitude} = nextProps.coords
    let {didSetMonsters} = nextState //monsterMarkers
    if (!latitude || !longitude) return
    if (didSetMonsters) return
    let monsters = new Array(monsterCount).fill(0)
    let monstersToRender = []
    monsters.map((item, index) => {
      let coord = this.getMonsterCoord(latitude, longitude, index)
      let images = QMark //this.randomIcon()
      return monstersToRender.push({id: index, latitude: coord.latitude, longitude: coord.longitude, icon: images})
    })
    this.setState({monsterMarkers: monstersToRender, didSetMonsters: true})
  }

  // TODO: If we don't want the ?-icon we can randomize icons
  // randomIcon = () => {
  // let images = [Monster, Robin]
  //   return images[Math.floor(Math.random() * images.length)]
  // }

  getMonsterCoord (latitude, longitude, index) {
    let pos = index * 0.001,
        neg = index * 0.001,
        result

    result = Math.floor(Math.random() * (pos + neg)) - neg
    result = result < 0 ? result : result
    latitude = latitude + result
    longitude = longitude + result
    return {latitude, longitude}
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
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
    height: '30px'
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
  },
  winnerText: {
    textAlign: 'center'
  }
}
