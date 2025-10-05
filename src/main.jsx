import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

// Remove default Vite styles if they exist
const removeDefaultStyles = () => {
  const defaultStylesheets = document.querySelectorAll('link[href*="App.css"], style')
  defaultStylesheets.forEach(stylesheet => {
    if (stylesheet.innerHTML && stylesheet.innerHTML.includes('#root')) {
      stylesheet.remove()
    }
  })
  
  // Remove any default styles from index.css if it exists
  const indexStylesheet = document.querySelector('link[href*="index.css"]')
  if (indexStylesheet) {
    indexStylesheet.remove()
  }
}

removeDefaultStyles()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)