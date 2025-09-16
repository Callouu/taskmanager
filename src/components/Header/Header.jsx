import './Header.scss'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <span>YourTaskManager</span>
        </div>
        
        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div className="header__cta">
          <button className="cta-button">Login</button>
        </div>
      </div>
    </header>
  )
}

export default Header
