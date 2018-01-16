import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<div> <App /> </div>, document.getElementById('root'))
// alert('hey this is react alert')
registerServiceWorker()
