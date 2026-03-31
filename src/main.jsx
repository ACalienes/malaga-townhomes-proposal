import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { applyTheme } from './theme.js'
import theme from './theme.js'
import { initAnalytics } from '@kameha/analytics'
import './index.css'

applyTheme()

if (theme.analytics?.projectId) {
  initAnalytics({
    projectId: theme.analytics.projectId,
    endpoint: theme.analytics.endpoint,
    apiKey: theme.analytics.apiKey,
    debug: import.meta.env.DEV,
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
