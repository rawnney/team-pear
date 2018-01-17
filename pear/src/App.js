import React, { Component } from 'react'
import { Route, NavLink, HashRouter } from 'react-router-dom'
import Home from './Home'
import Stuff from './Stuff'
import Contact from './Contact'
import './index.css'
// import Welcome from './Components/Welcome'
// import { Button } from 'reactstrap'
// import Nav from './Components/Nav'
// import './assets/css/main.css'

class App extends Component {
  render () {
    return (
      <HashRouter>
        <div>
          <h1>Game Info</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/stuff">Stuff</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/stuff" component={Stuff}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App
