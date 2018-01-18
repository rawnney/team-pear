import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Main from './Main'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <div>
    <Main />
  </div>,
  document.getElementById('root'))
registerServiceWorker()
