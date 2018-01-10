import React, { Component } from 'react'
import Welcome from './Components/Welcome'
import { Button } from 'reactstrap'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Welcome />
      </div>
    )
  }
}

export default App
