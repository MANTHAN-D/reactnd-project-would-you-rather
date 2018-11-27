import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'

import App from './App'
import './index.css'
import reducers from './reducers/index'
import middleware from './middleware/index'

const store = createStore(reducers, middleware)

ReactDom.render(<App />, document.getElementById('root'))
