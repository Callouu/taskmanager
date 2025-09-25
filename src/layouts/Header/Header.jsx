import './Header.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoFullWhite from '../../assets/tm_full_white.png'
import logoWhite from '../../assets/tm_logo_white.png'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
          <img src={logoWhite} alt="TaskManager Logo"/>
          </Link>
        </div>
        
        <div className="header__menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="material-icons">menu</span>
        </div>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
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
