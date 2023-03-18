import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import log  from 'loglevel';

if (import.meta.env.MODE == "development") {
  log.setLevel(log.levels.DEBUG);
} else {
  log.setLevel(log.levels.WARN);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
