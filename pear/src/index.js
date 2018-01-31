import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Main from './Main'
import Stuff from './Stuff'
import Inventory from './Components/Inventory'

import registerServiceWorker from './registerServiceWorker'
<<<<<<< HEAD

ReactDOM.render(
  <div className="container">
    {/* <Main />
    {/* <App/> */}
    {/* <Stuff /> */}
    < Inventory initialWeapons={10} initialArms={5} initialShields={15}/>
  </div>,
  document.getElementById('root'))
=======
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/main.css'

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
>>>>>>> nasim-dev2
registerServiceWorker()
