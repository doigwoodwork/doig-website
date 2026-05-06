window.__TWEAK_DEFAULTS = {
  "palette": "bone",
  "accent": "walnut",
  "displayFont": "Playfair Display",
  "bodyFont": "Geist",
  "heroStyle": "editorial",
  "language": "es"
};

import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import App from './app.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
