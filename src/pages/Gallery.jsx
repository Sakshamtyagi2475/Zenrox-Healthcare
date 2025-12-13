import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Download, X, ZoomIn, Search, PackageX } from 'lucide-react';
import productImages from '../utils/getProductImages';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
    const getFileName = (path) => {
    const file = path.split('/').pop();
    const name = file.split('.')[0]; 
    return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  // --- Search Filter Logic ---
  const filteredImages = productImages.filter((src) => 
    getFileName(src).toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Header />
      
      {/* --- Page Header --- */}
      <div className="gallery-header">
        <h1 data-aos="fade-down">Product Portfolio</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          Browse our extensive range of high-quality pharmaceutical products.<br/>
          From critical care to general medicine.
        </p>
        
        {/* --- Functional Search Bar --- */}
        <div className="search-bar-container" data-aos="fade-up" data-aos-delay="200">
          <Search size={20} className="search-icon"/>
          <input 
            className='search-input'
            type="text" 
            placeholder="Search by medicine name" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X size={18} className="clear-search" onClick={() => setSearchTerm('')}/>
          )}
        </div>
      </div>
      <section className="gallery-section">
        
        <div className="download-strip" data-aos="fade-up">
          <div className="strip-info">
            <h3>Complete Medicine List</h3>
            <p>Showing {filteredImages.length} products</p>
          </div>
          <a href="/Products-Catalog.pdf" download className="btn-download">
            <Download size={18} /> Download PDF Catalog
          </a>
        </div>

        {/* --- The Grid --- */}
        {filteredImages.length > 0 ? (
          <div className="gallery-grid">
            {filteredImages.map((src, index) => (
              <div 
                className="gallery-card" 
                key={index} 
                data-aos="fade-up" 
                onClick={() => setSelectedImage(src)}
              >
                <div className="card-image-wrapper">
                  <img 
                    src={src} 
                    alt={getFileName(src)} 
                    loading="lazy" 
                    onLoad={(e) => e.target.parentElement.classList.add('loaded')} 
                  />
                  <div className="overlay">
                    <ZoomIn size={32} color="white" />
                  </div>
                </div>
                <div className="card-details">
                  <span className="product-tag">In Stock</span>
                  <h4>{getFileName(src)}</h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State if search matches nothing */
          <div className="no-results">
            <PackageX size={64} color="#ccc" />
            <h3>No products found for "{searchTerm}"</h3>
            <p>Try searching for a different medicine name.</p>
          </div>
        )}
      </section>

      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close">
            <X size={32} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full View" />
            <div className="lightbox-caption">{getFileName(selectedImage)}</div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Gallery;