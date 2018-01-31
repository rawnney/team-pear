import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Main from './Main'
import Stuff from './Stuff'
import Inventory from './components/Inventory'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/main.css'
import registerServiceWorker from './registerServiceWorker'

// ReactDOM.render(
//   <div className="container">
//     {/* <Main />
//     {/* <App/> */}
//     {/* <Stuff /> */}
//     < Inventory initialWeapons={10} initialArms={5} initialShields={15}/>
//   </div>,
//   document.getElementById('root'))

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker()
