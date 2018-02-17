
import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import {Modal, Button} from 'reactstrap'
import fakeServerData from '../fakeServerData'
import EnemyComponent from './EnemyComponent'
import Pinjump from './Pinjump';
import Markers from './Markers'
import Images from '../libs/Imgs'
import FightView from './FightView'
import PlayerComponent from './PlayerComponent'
let {Monster, Robin, QMark} = Images

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
      enemyHP: 10, // Set to 100!
      playerHP: 100,
      monsterCount: fakeServerData.monster.length,
      monstersKilled: this.props.setUser.monstersKilled,
      user: this.props.setUser,
      coins: this.props.setUser.coins
    }
  }

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {
    this.setMonsters(nextProps, nextState)
  }

  render () {
    let {monsterMarkers, fightViewOpened, winnerIsSet, enemyHP, playerHP, activeMonsterName, activeMonsterAvatar, user} = this.state
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
          {winnerIsSet ? this.renderWinner() : <div />}
          <PlayerComponent playerHP={playerHP} username={user.username} avatar={user.avatar}/>
          <div style={styles.fightButton}>
            <Button onClick={this.handleClickEvent} color='danger'>Attack</Button>
          </div>
        </div>
      </Modal>
    </div>
  }


  toggleFightView = (id) => {
    let {fightViewOpened, user, monstersKilled, coins} = this.state
    let {updateUser} = this.props
    console.log(id);
    if (this.state.enemyHP === 0) {
    // TODO: randomize coindrop (depending on monster)  // this.setActiveMonsterCoins(id)
      this.killCounter()
      this.incCoins(id)
      this.removeMonster(id)
      updateUser(monstersKilled, coins)
    return this.setState({fightViewOpened: !fightViewOpened, enemyHP: 10, winnerIsSet: false, }) // Set to 100!
    } else {
    return this.setState({fightViewOpened: !fightViewOpened, activeMonsterName: this.setActiveMonsterName(id), activeMonsterAvatar: this.setActiveMonsterAvatar(id)})
    }
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

  handleClickEvent = () => {
    let {enemyHP, playerHP} = this.state
    if (enemyHP > 0) {
      this.setState({enemyHP: enemyHP - 10}, () => {
        if (enemyHP === 10 || playerHP === 10) {
          this.setState({winnerIsSet: true})
        }
      })
    }
  }

  killCounter = () => {
    let {monstersKilled} = this.state
    this.setState({monstersKilled: monstersKilled + 1})
  }

  incCoins = (id) => {
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
    let {monsterMarkers, didSetMonsters} = nextState
    if (!latitude || !longitude) return
    if (didSetMonsters) return
    let monsters = new Array(monsterCount).fill(0)
    let monstersToRender = []
    monsters.map((item, index) => {
      let coord = this.getMonsterCoord(latitude, longitude, index)
      let images = QMark //this.randomIcon()
      monstersToRender.push({id: index, latitude: coord.latitude, longitude: coord.longitude, icon: images})
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
  fightButton: {
    width: '20%',
    margin: 'auto'
  },
  winnerText: {
    textAlign: 'center'
  }
}
