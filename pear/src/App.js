import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import LeaderBoard from './components/LeaderBoard'
import Login from './components/Login'
import InfoRules from './components/InfoRules'
import Map from './components/Map'
import './index.css'
import { Button } from 'reactstrap'
import bg from './assets/img/bg.png'

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
)

/* Link components are used for linking to other views */
/* Route components are rendered if the path prop matches the current URL */

export default class App extends Component {
  render () {
    return (
      <div>
        <Map />
        {/* <img src={bg} alt='' className="bgmap" /> */}
        <div className=''>
          <nav className="navbar navbar-light">
            <ul className="nav navbar-nav">
              <Button><li><Link to="/">Home</Link></li></Button>
              <Button><li><Link to="/Login">Login</Link></li></Button>
              <Button><li><Link to="/LeaderBoard">Leader Board</Link></li></Button>
              <Button><li><Link to="/InfoRules">Info/Rules</Link></li></Button>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/Login" component={Login}/>
            <Route path="/LeaderBoard" component={LeaderBoard}/>
            <Route path="/InfoRules" component={InfoRules}/>
          </Switch>
        </div>
      </div>
    )
  }
}
