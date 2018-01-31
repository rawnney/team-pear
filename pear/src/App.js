import React, { Component } from 'react'
<<<<<<< HEAD
import logo from './logo.svg'
import './App.css'
import Users from './Components/Users'
=======
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import GameView from './components/GameView'
>>>>>>> nasim-dev2

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/GameView' component={GameView}/>
    </Switch>
  </main>
)

export default class App extends Component {
  render () {
    return (
      <div className="App">
<<<<<<< HEAD
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
          <Users users = "masud"/>
        </p>
=======
        <Main />
>>>>>>> nasim-dev2
      </div>
    )
  }
}
