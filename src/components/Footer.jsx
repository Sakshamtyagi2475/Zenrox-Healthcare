import React from 'react';
import './Footer.css';
import logo from '/zenrox-logo.jpg';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <img src={logo} alt="Zenrox Logo" className="footer-logo" />
          <p>Committed to better healthcare solutions.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
              <a href="https://www.instagram.com/zenroxhealthcare/" target='_blank' rel='noopener noreferrer'><FaInstagram />  Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61578461692727" target="_blank" rel="noopener noreferrer"><FaFacebookF />  Facebook</a>
              <a href="https://www.linkedin.com/in/zenrox-healthcare-912145374/" target="_blank" rel="noopener noreferrer" ><FaLinkedinIn />  LinkedIn</a>
              <a href="https://x.com/ZenroxHC" target='_blank' rel='noopener noreferrer'><FaXTwitter />  X</a>
          </div>
        </div>

        <div className="footer-section" style={{ color: '#FAFAFA', lineHeight: '1.8', fontSize: '0.95rem',}}>
          <h4>Contact</h4>
          <p> 91, YogiPuram, Kanker Khera, ShobhaPur,<br /> Meerut, Uttar Pradesh 250001</p>
          <p> 📞{' '}
            <a href="tel:+916398215627" style={{ color: '#FAFAFA', textDecoration: 'none', transition: 'color 0.3s',}}
              onMouseOver={(e) => (e.target.style.color = '#F7EFEA')} onMouseOut={(e) => (e.target.style.color = '#FAFAFA')}>
              +91 63982 15627 </a>
          </p>

          <p> ✉️{' '}
            <a href="mailto:info@zenroxhealthcare.in" style={{ color: '#FAFAFA', textDecoration: 'none', transition: 'color 0.3s', }}
              onMouseOver={(e) => (e.target.style.color = '#F7EFEA')} onMouseOut={(e) => (e.target.style.color = '#FAFAFA')}>
              info@zenroxhealthcare.in </a>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 Zenrox Healthcare. All rights reserved.</p>
        <p>Design and Develop by <a href='mailto:sakshamtyagi2475@gmail.com'>Saksham</a></p>
      </div>
    </footer>
  );
};

export default Footer;
