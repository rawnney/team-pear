import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Main from './Main'
import Stuff from './Stuff'
import Inventory from './Components/Inventory'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <div className="container">
    {/* <Main />
    {/* <App/> */}
    {/* <Stuff /> */}
    < Inventory initialWeapons={10} initialArms={5} initialShields={15}/>
  </div>,
  document.getElementById('root'))
registerServiceWorker()
