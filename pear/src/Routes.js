import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import App from './App'


const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/App' component={App}/>
    </Switch>
  </main>
)

export default Routes
