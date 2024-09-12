import ReactDom from 'react-dom/client'
import React from 'react'

import { Routes } from './routes'

import '@repo/ui/electron.css'

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
)
