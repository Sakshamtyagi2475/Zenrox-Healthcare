import React from 'react';
import './Footer.css';
import logo from '/zenrox-logo.jpg';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* --- Column 1: Brand & About --- */}
        <div className="footer-col brand-col">
          <img src={logo} alt="Zenrox HealthCare Logo" className="footer-logo" />
          <p className="brand-desc">
            Your trusted pharmaceutical partner in Meerut. Bridging the gap between manufacturers and healthcare providers with genuine quality and rapid delivery.
          </p>
        </div>

        {/* --- Column 2: Quick Links --- */}
        <div className="footer-col links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/gallery">Product Catalog</a></li>
            <li><a href="/contact">Partner With Us</a></li>
          </ul>
        </div>

        {/* --- Column 3: Contact Info --- */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Get in Touch</h4>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p>91, YogiPuram, Kanker Khera,<br/>ShobhaPur, Meerut, UP 250001</p>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <a href="tel:+916398215627">+91 63982 15627</a>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:info@zenroxhealthcare.in">info@zenroxhealthcare.in</a>
          </div>
        </div>

        {/* --- Column 4: Socials --- */}
        <div className="footer-col social-col">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/zenroxhealthcare/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578461692727" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com/in/zenrox-healthcare-912145374/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://x.com/ZenroxHC" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* --- Footer Bottom Strip --- */}
      <div className="footer-bottom">
        <p>&copy; 2025 Zenrox HealthCare. All rights reserved.</p>
        <p className="developer-credit">
          Design & Developed by <a href="mailto:sakshamtyagi2475@gmail.com">Saksham</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;