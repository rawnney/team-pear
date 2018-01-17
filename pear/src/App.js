import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import GameView from './components/GameView'

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
        <Main />
      </div>
    )
  }
}
