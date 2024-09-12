import './assets/main.css'

import { Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

import { Router } from '../../lib/electron-router-dom'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router
      main={
        <Route path="/" element={<App />} />
      }
    />
  </React.StrictMode>
)
