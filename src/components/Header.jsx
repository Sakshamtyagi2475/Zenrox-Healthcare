import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import logo from '/zenrox-logo.jpg';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // Close menu helper
  const closeMenu = () => setMenuOpen(false);
  
  // Helper to highlight active link
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <header className="header-mobile-optimized">
        <div className="header-inner">
          
          {/* 1. MOBILE MENU TOGGLE (Moved to Left) */}
          <button 
            className="menu-toggle" 
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* 2. LOGO (Centered on Mobile) */}
          <Link to="/" className="logo-container" onClick={closeMenu}>
            <img src={logo} alt="Zenrox Healthcare" />
          </Link>

          {/* 3. DESKTOP NAV (Hidden on Mobile) */}
          <nav className="desktop-nav">
            <Link to="/" className={`nav-item ${isActive('/')}`}>Home</Link>
            <Link to="/about" className={`nav-item ${isActive('/about')}`}>About</Link>
            <Link to="/gallery" className={`nav-item ${isActive('/gallery')}`}>Products</Link>
            <Link to="/contact" className={`nav-item ${isActive('/contact')}`}>Contact</Link>
          </nav>

          {/* 4. RIGHT SIDE ACTIONS */}
          <div className="header-right">
            
            {/* Desktop Quote Button */}
            <Link to="/contact" className="btn-desktop-quote">
              Get Quote
            </Link>

            {/* Mobile Direct Call Button */}
            <a href="tel:+916398215627" className="btn-mobile-call" aria-label="Call Now">
              <Phone size={20} />
            </a>
          </div>

        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <Link to="/" onClick={closeMenu}>Home <ChevronRight size={20}/></Link>
          <Link to="/about" onClick={closeMenu}>About Us <ChevronRight size={20}/></Link>
          <Link to="/gallery" onClick={closeMenu}>Product Catalog <ChevronRight size={20}/></Link>
          <Link to="/contact" onClick={closeMenu}>Contact & Support <ChevronRight size={20}/></Link>
        </div>
        
        <div className="mobile-footer">
          <p>Need help? Call us directly:</p>
          <a href="tel:+916398215627" className="btn-mobile-big-call">
            <Phone size={20} /> +91 63982 15627
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;