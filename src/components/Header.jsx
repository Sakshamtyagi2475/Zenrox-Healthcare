import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/zenrox-logo.jpg';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="Zenrox Logo" />
        </Link>
        </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '×' : '☰'}
      </button>

      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-list" onClick={closeMenu}>
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item"><Link to="/gallery">Gallery</Link></li>
          <li className="nav-item"><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <div className="header-actions desktop-only">
          <a href="tel:+916398215627" className="h-btn">Call +91 63982 15627</a>
      </div>
    </header>
  );
};

export default Header;
