import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App'
import './index.less'

const root = createRoot(document.querySelector('#root') as Element)
root.render(<App />)
