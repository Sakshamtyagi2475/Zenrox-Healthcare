import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- DATA MOCK ---
const imageMetadata = {
  'shoe-red.jpg': 'Nike Air Jordan Red',
  'watch-gold.png': 'Luxury Gold Watch',
};

const manualImages = [
  { id: 'manual-1', url: '/Welcome-page.webp', name: 'Welcome Page' },
];

// Load images (Vite specific)
const imagesGlob = import.meta.glob('../assets/products/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const folderImages = Object.entries(imagesGlob).map(([path, module], index) => {
  const filename = path.split('/').pop();
  const friendlyName = imageMetadata[filename] 
    ? imageMetadata[filename] 
    : filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ""); 

  return { id: `auto-${index}`, url: module.default, name: friendlyName };
});

const allImages = [...manualImages, ...folderImages];

// --- ICONS ---
const IconArrowLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconMaximize = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>;
const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

const Page = () => {
  const [images] = useState(allImages);
  const [selectedImage, setSelectedImage] = useState(images[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- LAYOUT STATE ---
  const [sidebarWidth, setSidebarWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth * 0.30 : 300
  );
  
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isFullScreen, setIsFullScreen] = useState(false);  

  // --- FILTER ---
  const filteredImages = useMemo(() => {
    if (!searchQuery) return images;
    return images.filter(img => img.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [images, searchQuery]);

  // --- RESIZING LOGIC ---
  const startResizing = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize = useCallback((e) => {
    if (isResizing) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const maxWidth = window.innerWidth * 0.8; // Max 80% of screen
      
      // Min 150px, Max 80%
      if (clientX >= 150 && clientX <= maxWidth) {
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

  // --- STYLES ---
  const styles = {
    container: {
      display: 'flex',
      height: '100dvh',        
      width: '100%',
      overflow: 'hidden',     
      fontFamily: 'system-ui, -apple-system, sans-serif',
      userSelect: isResizing ? 'none' : 'auto',
      touchAction: 'none',
      backgroundColor: '#f9fafb',
    },
    // Left Pane
    leftPane: {
      width: isSidebarOpen ? `${sidebarWidth}px` : '0px',
      minWidth: isSidebarOpen ? '150px' : '0px',
      maxWidth: '80%', // CSS fallback for safety
      opacity: isSidebarOpen ? 1 : 0,
      height: '100%',
      backgroundColor: '#f4f4f5',
      display: 'flex',       
      flexDirection: 'column', 
      borderRight: isSidebarOpen ? '1px solid #e5e7eb' : 'none',
      transition: isResizing ? 'none' : 'width 0.3s ease, opacity 0.2s ease',
      overflow: 'hidden',
    },
    header: {
      padding: '15px',
      backgroundColor: '#f4f4f5',
      position: 'sticky',
      top: 0,
      zIndex: 5,
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      borderBottom: '1px solid #e5e7eb',
      flexShrink: 0,
    },
    inputWrapper: {
      position: 'relative',
      flex: 1, 
      display: 'flex',
      alignItems: 'center',
    },
    searchInput: {
      width: '100%',
      padding: '8px 10px 8px 35px',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: 'white',
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      pointerEvents: 'none',
      display: 'flex',
    },
    // Grid System
    gridArea: {
      flex: 1, 
      overflowY: 'auto',
      padding: '15px',
      display: 'grid',
      // Responsive grid: minimum 110px width per item
      gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', 
      gap: '12px',
      alignContent: 'start',
    },
    // Card Style (Image Top, Text Bottom)
    imageItem: {
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      overflow: 'visible',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      height: 'fit-content',
    },

    activeImage: {
      borderColor: '#2563eb', 
      boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
    },
    // Image Container
    imgContainer: {
      width: '100%',
      aspectRatio: '1 / 1', // Keeps the image area square
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px',
      borderBottom: '1px solid #f3f4f6',
    },
    imgThumb: {
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain', // Ensures FULL image is visible
      display: 'block',
      pointerEvents: 'none', 
    },
    // Text Label
    label: {
      width: '100%',
      padding: '8px',
      fontSize: '11px',
      color: '#374151',
      textAlign: 'center',
      whiteSpace: 'normal', // Allow text to wrap
      overflow: 'hidden',
      lineHeight: '1.3',
      fontWeight: '500',
    },
    resizer: {
      display: isSidebarOpen ? 'block' : 'none',
      width: '12px',
      marginLeft: '-6px',
      cursor: 'col-resize',
      height: '100%',
      backgroundColor: 'transparent', 
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
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    },
    controlButton: {
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#374151',
      transition: 'all 0.2s',
      zIndex: 20,
    },
    floatingBtn: {
      position: 'absolute',
      top: '20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderRadius: '50%', 
      width: '40px',
      height: '40px',
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
      animation: 'fadeIn 0.2s ease-out',
    },
    fullScreenImg: {
      width: 'auto',
      height: 'auto',
      maxWidth: '95vw',
      maxHeight: '95vh',
      objectFit: 'contain', 
      borderRadius: '4px',
      boxShadow: '0 0 30px rgba(0,0,0,0.5)',
    },
    closeFsButton: {
      position: 'absolute', 
      top: '20px', 
      right: '20px',
      background: 'rgba(255,255,255,0.15)', 
      color: 'white',
      border: '1px solid rgba(255,255,255,0.2)', 
      borderRadius: '50%',
      width: '44px', 
      height: '44px',
      cursor: 'pointer', 
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'center',
      transition: 'background 0.2s',
    }
  };

  return (
    <>
      <div style={styles.container}>
        
        {/* --- LEFT SIDEBAR --- */}
        <div style={styles.leftPane}>
          <div style={styles.header}>
            <button 
              style={styles.controlButton}
              onClick={() => setIsSidebarOpen(false)}
              title="Hide Sidebar"
            >
              <IconArrowLeft />
            </button>

            <div style={styles.inputWrapper}>
              <div style={styles.searchIcon}><IconSearch /></div>
              <input 
                type="text" 
                placeholder="Search..." 
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.gridArea}>
            {filteredImages.length > 0 ? (
              filteredImages.map((img) => (
                <div
                  key={img.id}
                  style={{
                    ...styles.imageItem,
                    ...(selectedImage && selectedImage.id === img.id ? styles.activeImage : {}),
                  }}
                  onClick={() => setSelectedImage(img)}
                  title={img.name}
                >
                  {/* Image Area */}
                  <div style={styles.imgContainer}>
                    <img src={img.url} alt={img.name} style={styles.imgThumb} loading="lazy" />
                  </div>
                  {/* Text Area */}
                  <div style={styles.label}>{img.name}</div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280', marginTop: '20px', fontSize: '14px' }}>
                No images found.
              </div>
            )}
          </div>
        </div>

        {/* --- RESIZER --- */}
        <div
          style={styles.resizer}
          onMouseDown={startResizing}
          onTouchStart={startResizing}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.5)'} 
          onMouseLeave={(e) => !isResizing && (e.currentTarget.style.backgroundColor = 'transparent')}
        />

        {/* --- RIGHT PREVIEW PANE --- */}
        <div style={styles.rightPane}>
          
          {!isSidebarOpen && (
            <button 
              style={{...styles.controlButton, ...styles.floatingBtn, left: '20px'}}
              onClick={() => setIsSidebarOpen(true)}
              title="Show Sidebar"
            >
              <IconMenu />
            </button>
          )}

          {selectedImage && (
            <button 
              style={{...styles.controlButton, ...styles.floatingBtn, right: '20px'}}
              onClick={() => setIsFullScreen(true)}
              title="Full Screen"
            >
              <IconMaximize />
            </button>
          )}

          {selectedImage ? (
            <div style={{textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <img src={selectedImage.url} alt="Preview" style={styles.previewImage} />
              <h3 style={{marginTop: '20px', color: '#111827', fontWeight: '500'}}>{selectedImage.name}</h3>
            </div>
          ) : (
            <div style={{ color: '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <IconSearch />
              <span>Select an image to view</span>
            </div>
          )}
        </div>
      </div>

      {/* --- FULL SCREEN OVERLAY --- */}
      {isFullScreen && selectedImage && (
        <div style={styles.fullScreenOverlay} onClick={() => setIsFullScreen(false)}>
          <button 
            style={styles.closeFsButton}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
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