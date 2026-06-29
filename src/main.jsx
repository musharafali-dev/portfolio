import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { PerformanceProvider } from './core/store/PerformanceContext.jsx'

document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PerformanceProvider>
        <App />
      </PerformanceProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

