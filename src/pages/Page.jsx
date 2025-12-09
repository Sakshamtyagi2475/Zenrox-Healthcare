import React, { useState, useEffect, useCallback } from 'react';

// --- 1. MANUAL IMPORTS ---
const manualImages = [
  {
    id: 'manual-1',
    url: '/Welcome-page.webp', // Ensure this file exists in your public folder
    name: 'Welcome Image'
  },
];

// --- 2. DYNAMIC IMPORTS ---
const imagesGlob = import.meta.glob('../assets/products/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const folderImages = Object.entries(imagesGlob).map(([path, module], index) => {
  return {
    id: `auto-${index}`,
    url: module.default, 
    name: path.split('/').pop()
  };
});

const allImages = [...manualImages, ...folderImages];

// --- ICONS ---
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconMaximize = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>;
const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

const Page = () => {
  const [images] = useState(allImages);
  const [selectedImage, setSelectedImage] = useState(images[0] || null);
  
  // Layout State
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isFullScreen, setIsFullScreen] = useState(false);  

  const MIN_WIDTH = 100;
  const MAX_WIDTH = 800;

  // --- Resizing Logic ---
  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const getClientX = (event) => {
    return 'touches' in event ? event.touches[0].clientX : event.clientX;
  };
  
  const resize = useCallback((e) => {
    if (isResizing) {
      const clientX = getClientX(e);
      if (clientX >= MIN_WIDTH && clientX <= MAX_WIDTH) {
        setSidebarWidth(clientX);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
      window.addEventListener("touchmove", resize, { passive: false });
      window.addEventListener("touchend", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
      window.removeEventListener("touchmove", resize);
      window.removeEventListener("touchend", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  // --- Styles ---
  const styles = {
    container: {
      display: 'flex',
      height: '100dvh',        
      width: '100%',
      overflow: 'hidden',     
      fontFamily: 'system-ui, -apple-system, sans-serif',
      userSelect: 'none', 
      touchAction: 'none',
    },
    leftPane: {
      width: isSidebarOpen ? `${sidebarWidth}px` : '0px',
      minWidth: isSidebarOpen ? `${MIN_WIDTH}px` : '0px',
      opacity: isSidebarOpen ? 1 : 0,
      height: '100%',
      overflowY: 'auto',      
      backgroundColor: '#f4f4f5',
      padding: isSidebarOpen ? '10px' : '0px',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: sidebarWidth < 300 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
      gap: '8px',
      alignContent: 'start',  
      borderRight: isSidebarOpen ? '1px solid #e5e7eb' : 'none',
      
      // --- THE FIX IS HERE ---
      // Disable transition while dragging, enable it for button toggle
      transition: isResizing ? 'none' : 'width 0.3s ease, opacity 0.2s ease, padding 0.3s ease',
    },
    imageItem: {
      aspectRatio: '1 / 1',   
      cursor: 'pointer',
      borderRadius: '6px',
      border: '2px solid transparent',
      overflow: 'hidden',
      backgroundColor: '#e5e7eb',
    },
    activeImage: {
      borderColor: '#2563eb', 
      boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
      transform: 'scale(0.95)',
    },
    imgThumb: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      pointerEvents: 'none', 
    },
    resizer: {
      display: isSidebarOpen ? 'block' : 'none',
      width: '12px',
      marginLeft: '-6px',
      cursor: 'col-resize',
      height: '100%',
      backgroundColor: isResizing ? '#2563eb' : 'transparent', 
      position: 'relative',
      zIndex: 10, 
    },
    rightPane: {
      flex: 1, 
      height: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      position: 'relative', 
    },
    previewImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain', 
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    controlButton: {
      position: 'absolute',
      top: '20px',
      padding: '8px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#374151',
      transition: 'all 0.2s',
      zIndex: 20,
    },
    fullScreenOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100dvh',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    },
    fullScreenImg: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    },
    closeFsButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.leftPane}>
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                ...styles.imageItem,
                ...(selectedImage && selectedImage.id === img.id ? styles.activeImage : {}),
              }}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.url} 
                alt={img.name} 
                style={styles.imgThumb}
                loading="lazy" 
              />
            </div>
          ))}
          {images.length === 0 && <p style={{color: '#666'}}>No images</p>}
        </div>

        <div
          style={styles.resizer}
          onMouseDown={startResizing}
          onTouchStart={startResizing}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#93c5fd'} 
          onMouseLeave={(e) => !isResizing && (e.currentTarget.style.backgroundColor = 'transparent')}
        />

        <div style={styles.rightPane}>
          <button 
            style={{...styles.controlButton, left: '20px'}}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          >
            <IconMenu />
          </button>

          {selectedImage && (
            <button 
              style={{...styles.controlButton, right: '20px'}}
              onClick={() => setIsFullScreen(true)}
              title="Full Screen"
            >
              <IconMaximize />
            </button>
          )}

          {selectedImage ? (
            <img 
              src={selectedImage.url} 
              alt="Selected Preview" 
              style={styles.previewImage} 
            />
          ) : (
            <div style={{ color: '#6b7280' }}>Click an image</div>
          )}
        </div>
      </div>

      {isFullScreen && selectedImage && (
        <div style={styles.fullScreenOverlay} onClick={() => setIsFullScreen(false)}>
          <button style={styles.closeFsButton}>
            <IconClose />
          </button>
          <img 
            src={selectedImage.url} 
            alt="Full Screen" 
            style={styles.fullScreenImg}
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
};

export default Page;