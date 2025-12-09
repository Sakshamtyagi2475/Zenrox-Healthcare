import React, { useState, useEffect } from 'react';
import './App.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import Footer from './components/Footer';
import productImages from './utils/getProductImages';

import main_img1 from './assets/main_img1.webp';


const reviews = [
  { name: 'Dr. Anjali Sharma', text: 'Trusted quality and prompt delivery.' },
  { name: 'Rohit Mehra', text: 'Very professional and responsive team.' },
  { name: 'Sneha Kapoor', text: 'Neat packaging. Great service.' },
  { name: 'Nikhil Rao', text: 'Reliable partner for pharma needs.' },
  { name: 'Priya Jain', text: 'Fast service and easy communication.' },
];


function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <>
      <Header />
      <div className="about">
        <div className="about-text">
          {/* <h1>ABOUT US</h1> */}
          <p>At Zenrox Healthcare, we are committed to being your trusted medicine distributor in India. Based in Meerut, Uttar Pradesh, we provide genuine pharmaceutical products at wholesale prices to retailers, pharmacies, and medical institutions.</p>
          <p>Founded with a vision to simplify the pharmaceutical supply chain, Zenrox Healthcare has built a strong reputation as a trusted pharma wholesaler. Our team collaborates closely with reputed medicine manufacturers to ensure that only genuine and quality-approved medicines reach the market.</p>
          <p>We specialize in serving healthcare businesses of all sizes—from small neighborhood pharmacies to large hospital chains. Whether you're looking for generic medicines, branded drugs, or over-the-counter products, Zenrox Healthcare is your reliable partner.</p>
        </div>
        <div className="about-img">
          <img src={main_img1} alt="About Us" fetchpriority="high" data-aos="fade"/>
        </div>
      </div>

      <section className="product-section">
        <h2 data-aos="fade-up" className="section-title">Our Products</h2>

        <div className="carousel right-to-left" data-aos="fade-left"
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          <div className="carousel-track">
            {[...productImages, ...productImages].map((src, i) => (
              <img
                src={src}
                alt={`Product ${i + 1}`}
                className="product-image"
                loading="lazy"
                key={`carousel1-${i}`}
                onLoad={(e) => e.target.classList.add('loaded')}
              />
            ))}
          </div>
        </div>

        <div className="carousel left-to-right" data-aos="fade-right"
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          <div className="carousel-track">
            {[...productImages, ...productImages].map((src, i) => (
              <img
                src={src}
                alt={`Product ${i + 1}`}
                className="product-image"
                loading="lazy"
                key={`carousel2-${i}`}
                onLoad={(e) => e.target.classList.add('loaded')}
              />
            ))}
          </div>
        </div>
      </section>


      <h2 className="review-title" data-aos="fade-up">What our customer says</h2>
      <div className="review-container">
        <div className="review-card">
          <p className="review-text">"{reviews[currentIndex].text}"</p>
          <p className="review-name">- {reviews[currentIndex].name}</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
