import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
)

const LeaderBoard = () => (
  <div>
    <h1>Leaderboard</h1>
  </div>
)

const InfoRules = () => (
  <div>
    <h1>Info/Rules</h1>
  </div>
)

/* Link components are used for linking to other views */
/* Route components are rendered if the path prop matches the current URL */

class App extends Component {
  render () {
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/LeaderBoard">Leader Board</Link></li>
            <li><Link to="/InfoRules">Info/Rules</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/LeaderBoard" component={LeaderBoard}/>
          <Route path="/InfoRules" component={InfoRules}/>
        </Switch>

      </div>
    )
  }
}

export default App
