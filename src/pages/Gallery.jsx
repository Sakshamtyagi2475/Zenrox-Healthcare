import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import productImages from '../utils/getProductImages';
import './Gallery.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Gallery = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <>
    <Header/>
    <section className="products-gallery">
      <h2 className="gallery-title" data-aos="fade-up">Our Products</h2>
        <a href="/Products-Catalog.pdf" download className="download-btn" data-aos="fade-up"> 📄 Download Product Catalog</a>
      <div className="gallery-grid">
        {productImages.map((src, index) => (
          <div className="gallery-item" key={index} data-aos="zoom-in" data-aos-delay={index * 50}>
            <img src={src} alt={`Product ${index + 1}`} loading="lazy" onLoad={(e) => e.target.classList.add('loaded')} />
          </div>
        ))}
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Gallery;
