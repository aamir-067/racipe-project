import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NavBar, Footer } from "./components/index.js"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < NavBar />
    <App />
    <Footer />
  </React.StrictMode>,
)
