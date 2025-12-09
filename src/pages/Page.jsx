import React, { useState, useRef, useEffect, useCallback } from 'react';

// --- DYNAMIC IMAGE IMPORT (Vite) ---
// 1. We look one folder up (..) to get from 'pages' to 'src', then into 'assets/products'
// 2. { eager: true } forces the images to load immediately so we can list them
const imagesGlob = import.meta.glob('../assets/products/*.{png,jpg,jpeg,svg,webp}', { eager: true });

// 3. Convert the raw Vite object into a clean array we can loop over
const localImages = Object.entries(imagesGlob).map(([path, module], index) => {
  return {
    id: index,
    // module.default is the actual URL path to the image after Vite builds it
    url: module.default, 
    name: path.split('/').pop() // Extracts filename for alt text (e.g., 'shoe.jpg')
  };
});

const Page = () => {
  const [images] = useState(localImages);
  // Default to the first image, or null if folder is empty
  const [selectedImage, setSelectedImage] = useState(images[0] || null);
  
  // Sidebar state
  const [sidebarWidth, setSidebarWidth] = useState(400); // Initial width
  const [isResizing, setIsResizing] = useState(false);
  
  // Constraints
  const MIN_WIDTH = 200;
  const MAX_WIDTH = 800;

  // --- Resizing Logic ---
  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);
  
  const resize = useCallback((e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      // Prevent sidebar from disappearing or getting too big
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    }
  }, [isResizing]);

  // Global event listeners for smooth dragging even if mouse leaves the handle
  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  // --- Styles ---
  const styles = {
    container: {
      display: 'flex',
      height: '100vh',        // Takes full viewport height
      width: '100%',
      overflow: 'hidden',     // Prevents whole page scroll
      fontFamily: 'system-ui, -apple-system, sans-serif',
      userSelect: isResizing ? 'none' : 'auto', // Disables text highlight while resizing
    },
    leftPane: {
      width: `${sidebarWidth}px`,
      minWidth: `${MIN_WIDTH}px`,
      height: '100%',
      overflowY: 'auto',      // Allows ONLY this section to scroll
      backgroundColor: '#f4f4f5',
      padding: '10px',
      boxSizing: 'border-box',
      display: 'grid',
      // Strict 5-column grid as requested
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '12px',
      alignContent: 'start',  // Keeps rows compact at the top
      borderRight: '1px solid #e5e7eb',
    },
    imageItem: {
      aspectRatio: '1 / 1',   // Forces perfect squares
      cursor: 'pointer',
      overflow: 'hidden',
      borderRadius: '6px',
      border: '2px solid transparent',
      transition: 'all 0.2s ease',
      backgroundColor: '#e5e7eb', // Grey background while loading
      position: 'relative'
    },
    activeImage: {
      borderColor: '#2563eb', // Blue border for selected
      boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
      transform: 'scale(0.95)',
    },
    imgThumb: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      pointerEvents: 'none', // Prevents image drag ghosting
    },
    resizer: {
      width: '6px',
      cursor: 'col-resize',
      height: '100%',
      backgroundColor: isResizing ? '#2563eb' : 'transparent', // Light up when dragging
      position: 'relative',
      zIndex: 10,
      marginLeft: '-3px', // Centers the handle visually on the border
    },
    rightPane: {
      flex: 1, // Takes remaining space
      height: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      boxSizing: 'border-box',
    },
    previewImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain', // Ensures full image is visible
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    emptyMessage: {
      color: '#6b7280',
      textAlign: 'center',
      fontSize: '1.125rem',
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Pane (Scrollable Grid) */}
      <div style={styles.leftPane}>
        {images.length > 0 ? (
          images.map((img) => (
            <div
              key={img.id}
              style={{
                ...styles.imageItem,
                ...(selectedImage && selectedImage.id === img.id ? styles.activeImage : {}),
              }}
              onClick={() => setSelectedImage(img)}
              title={img.name}
            >
              <img 
                src={img.url} 
                alt={img.name} 
                style={styles.imgThumb}
                loading="lazy" 
              />
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px', color: '#666' }}>
            No images found in src/assets/products
          </div>
        )}
      </div>

      {/* Resizer Handle */}
      <div
        style={styles.resizer}
        onMouseDown={startResizing}
        // Visual indicator on hover
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#93c5fd'} 
        onMouseLeave={(e) => !isResizing && (e.currentTarget.style.backgroundColor = 'transparent')}
      />

      {/* Right Pane (Static Preview) */}
      <div style={styles.rightPane}>
        {selectedImage ? (
          <img 
            src={selectedImage.url} 
            alt="Selected Preview" 
            style={styles.previewImage} 
          />
        ) : (
          <div style={styles.emptyMessage}>
            Click an image from the sidebar to preview
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;