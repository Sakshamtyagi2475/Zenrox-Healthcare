import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ShieldCheck, Truck, Clock, MapPin, Phone } from 'lucide-react'; // Icons

import Header from './components/Header';
import Footer from './components/Footer';
import productImages from './utils/getProductImages';
import main_img1 from './assets/main_img1.webp';

const reviews = [
  { name: 'Dr. Anjali Sharma', role: 'General Physician, Meerut', text: 'Zenrox provides the most reliable supply chain in the city. Genuine medicine and on-time delivery.' },
  { name: 'Rohit Mehra', role: 'Pharmacy Owner', text: 'Very professional team. Stock availability is great, and their wholesale rates are competitive.' },
  { name: 'Sneha Kapoor', role: 'Clinic Manager', text: 'Neat packaging and professional staff. Best distributor in UP West.' },
  { name: 'Nikhil Rao', role: 'Chemist', text: 'Reliable partner for all our pharma needs. Highly recommended.' },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Slower rotation for better readability
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="app-container">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-content" data-aos="fade-up">
          <span className="badge">Now Serving Meerut & NCR</span>
          <h1>  Your Trusted <span className="text-gradient">Pharmaceutical</span> Supply Partner</h1>
          <p>We bridge the gap between manufacturers and healthcare providers. Genuine medicines, wholesale pricing, and rapid delivery for clinics and pharmacies.</p>
          <div className="hero-buttons">
            <a href="/gallery">
            <button className="btn-primary">View Catalog</button></a>
            <a href="/contact">
            <button className="btn-secondary">Partner With Us</button></a>
          </div>
        </div>
      </section>

      {/* --- FEATURES / TRUST SIGNALS --- */}
      <section className="features">
        <div className="feature-card" data-aos="fade-up" data-aos-delay="0">
          <ShieldCheck size={50} className="feature-icon" />
          <h3>100% Genuine</h3>
          <p>Sourced directly from top manufacturers ensuring authenticity.</p>
        </div>
        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
          <Truck size={50} className="feature-icon" />
          <h3>Fast Delivery</h3>
          <p>Same-day dispatch for partners across Meerut and surrounding areas.</p>
        </div>
        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
          <Clock size={50} className="feature-icon" />
          <h3>24/7 Support</h3>
          <p>Dedicated support line for doctors and pharmacy owners.</p>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="about">
        <div className="about-img" data-aos="fade-right">
          <img src={main_img1} alt="Zenrox Healthcare Warehouse" loading="lazy" />
          <div className="img-caption">
            <MapPin size={16} /> Based in Meerut, UP
          </div>
        </div>
        <div className="about-text" data-aos="fade-left">
          <h4 className="section-subtitle">WHO WE ARE</h4>
          <h2>Empowering Healthcare with Reliable Distribution</h2>
          <p>
            At <strong>Zenrox Healthcare</strong>, we are committed to strengthening the healthcare infrastructure of Uttar Pradesh. 
            Founded with a vision to simplify the pharmaceutical supply chain, we have quickly built a reputation as a trusted wholesaler in Meerut.
          </p>
          <p>
            We specialize in serving healthcare businesses of all sizes—from neighborhood pharmacies to multi-specialty hospitals. 
            Whether you need generic medicines, branded drugs, or critical care products, Zenrox is your steady partner.
          </p>
          <div className="stat-row">
            <div><strong>500+</strong><br/>Products</div>
            <div><strong>100%</strong><br/>Quality Check</div>
            <div><strong>24hr</strong><br/>Dispatch</div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS CAROUSEL --- */}
      <section className="product-section">
        <div className="section-header" data-aos="fade-up">
          <h2>Our Product Range</h2>
          <p>Comprehensive pharmaceutical solutions for every medical need.</p>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel right-to-left">
            <div className="carousel-track">
              {[...productImages, ...productImages].map((src, i) => (
                <div className="product-card" key={`c1-${i}`}>
                   <img src={src} alt="Medicine Product" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section className="reviews-section">
        <h2 data-aos="zoom-in">Trusted by Local Doctors & Chemists</h2>
        <div className="review-display" data-aos="fade-up">
          <div className="review-quote-icon">“</div>
          <p className="review-text">{reviews[currentIndex].text}</p>
          <div className="review-author">
            <h4>{reviews[currentIndex].name}</h4>
            <span>{reviews[currentIndex].role}</span>
          </div>
          <div className="review-dots">
            {reviews.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION STRIP --- */}
      <section className="cta-strip">
        <div className="cta-content">
          <h3>Ready to stock your pharmacy?</h3>
          <p>Get the best wholesale rates in Meerut today.</p>
        </div>
          <a href="tel:+916398215627">
        <button className="btn-white">
          <Phone size={18} style={{marginRight: '8px'}}/> Call Now 
        </button></a> 
      </section>

      <Footer />
    </div>
  );
}

export default App;