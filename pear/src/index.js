import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Main from './Main'
import Stuff from './Stuff'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <div>
    {/* <Main /> */}
    <App/>
    {/* <Stuff /> */}
  </div>,
  document.getElementById('root'))
registerServiceWorker()
