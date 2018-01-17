import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
// import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<div> <App /> </div>,
  document.getElementById('root'))
registerServiceWorker()
