// @flow
import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import LeaderBoard from './components/LeaderBoard'
import Login from './components/Login'
import InfoRules from './components/InfoRules'
import Map from './components/Map'
import './index.css'
import './assets/css/main.css'
import { Button } from 'reactstrap'
import CharacterView from './components/CharacterView'
import FightView from './components/FightView'
import MyAccount from './components/MyAccount'

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
)

/* Link components are used for linking to other views */
/* Route components are rendered if the path prop matches the c2urrent URL */

export default class App extends Component {
  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Map />
        <div className=''>
          <nav className="navbar navbar-light">
            <ul className="nav navbar-nav">
              <Link to="/"><Button><li>Home</li></Button></Link>
              <Link to="/MyAccount"><Button><li>My Account</li></Button></Link>
              <Link to="/Login"><Button><li>Login</li></Button></Link>
              <Link to="/LeaderBoard"><Button><li>Leader Board</li></Button></Link>
              <Link to="/InfoRules"><Button><li>Info/Rules</li></Button></Link>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/MyAccount" component={MyAccount}/>
            <Route path="/Login" component={Login}/>
            <Route path="/LeaderBoard" component={LeaderBoard}/>
            <Route path="/InfoRules" component={InfoRules}/>
          </Switch>
        </div>
        <FightView style={{justifyContent: 'center', alignSelf: 'center'}}/>
        <CharacterView style={{position: 'absolute', bottom: '0'}}/>
      </div>
    )
  }
}
