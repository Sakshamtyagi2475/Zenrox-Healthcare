import React, { useState, useEffect, useCallback, useMemo } from 'react';

const imageMetadata = {
  'shoe-red.jpg': 'Nike Air Jordan Red',
  'watch-gold.png': 'Luxury Gold Watch',
};

const manualImages = [
  { id: 'manual-1', url: '/Welcome-page.webp', name: 'Welcome Page' },
];

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
  // Default: 50% of the current window width
  const [sidebarWidth, setSidebarWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth / 2 : 400
  );
  
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isFullScreen, setIsFullScreen] = useState(false);  

  // --- FILTER ---
  const filteredImages = useMemo(() => {
    if (!searchQuery) return images;
    return images.filter(img => img.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [images, searchQuery]);

  // --- RESIZING ---
  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const getClientX = (event) => 'touches' in event ? event.touches[0].clientX : event.clientX;
  
  const resize = useCallback((e) => {
    if (isResizing) {
      const clientX = getClientX(e);
      // Min width 100px, Max width (Screen - 50px)
      if (clientX >= 100 && clientX <= window.innerWidth - 50) {
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
      userSelect: 'none', 
      touchAction: 'none',
    },
    // Left Pane
    leftPane: {
      // Logic: If open, use sidebarWidth. If closed, 0px.
      width: isSidebarOpen ? `${sidebarWidth}px` : '0px',
      minWidth: isSidebarOpen ? '100px' : '0px',
      opacity: isSidebarOpen ? 1 : 0,
      height: '100%',
      backgroundColor: '#f4f4f5',
      display: 'flex',       
      flexDirection: 'column', 
      borderRight: isSidebarOpen ? '1px solid #e5e7eb' : 'none',
      transition: isResizing ? 'none' : 'width 0.3s ease, opacity 0.2s ease',
      position: 'relative',
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
    },
    inputWrapper: {
      position: 'relative',
      flex: 1, 
      display: 'flex',
      alignItems: 'center',
    },
    searchInput: {
      width: '100%',
      padding: '10px 10px 10px 35px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      pointerEvents: 'none',
    },
    // Grid
    gridArea: {
      flex: 1, 
      overflowY: 'auto',
      padding: '0 10px 10px 10px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
      gap: '8px',
      alignContent: 'start',
    },
    imageItem: {
      aspectRatio: '1 / 1',   
      cursor: 'pointer',
      borderRadius: '6px',
      border: '2px solid transparent',
      overflow: 'hidden',
      backgroundColor: '#e5e7eb',
      position: 'relative',
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
    label: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      background: 'rgba(0,0,0,0.6)',
      color: 'white',
      fontSize: '10px',
      padding: '4px',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'center',
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
    // Buttons
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
    // Specific styles for floating buttons
    floatingBtn: {
      position: 'absolute',
      top: '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      borderRadius: '50%', 
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
    },
    fullScreenImg: {
      width: 'auto',
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
      
      objectFit: 'contain', 
      borderRadius: '4px',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    },
    closeFsButton: {
      position: 'absolute', top: '20px', right: '20px',
      background: 'rgba(255,255,255,0.2)', color: 'white',
      border: 'none', borderRadius: '50%',
      width: '40px', height: '40px',
      cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }
  };

  return (
    <>
      <div style={styles.container}>
        
        {/* --- LEFT SIDEBAR --- */}
        <div style={styles.leftPane}>
          <div style={styles.header}>
            {/* HIDE SIDEBAR BUTTON (Placed here as requested) */}
            <button 
              style={styles.controlButton}
              onClick={() => setIsSidebarOpen(false)}
              title="Hide Sidebar"><IconArrowLeft />
            </button>

            {/* Search Bar */}
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

          {/* Grid */}
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
                  <img src={img.url} alt={img.name} style={styles.imgThumb} loading="lazy" />
                  <div style={styles.label}>{img.name}</div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666', marginTop: '20px' }}>
                No results.
              </div>
            )}
          </div>
        </div>

        {/* --- RESIZER --- */}
        <div
          style={styles.resizer}
          onMouseDown={startResizing}
          onTouchStart={startResizing}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#93c5fd'} 
          onMouseLeave={(e) => !isResizing && (e.currentTarget.style.backgroundColor = 'transparent')}
        />

        {/* --- RIGHT PREVIEW PANE --- */}
        <div style={styles.rightPane}>
          
          {/* SHOW SIDEBAR BUTTON (Only visible when sidebar is CLOSED) */}
          {!isSidebarOpen && (
            <button 
              style={{...styles.controlButton, ...styles.floatingBtn, left: '20px'}}
              onClick={() => setIsSidebarOpen(true)}
              title="Show Sidebar"
            >
              <IconMenu />
            </button>
          )}

          {/* FULL SCREEN BUTTON */}
          {selectedImage && (
            <button 
              style={{...styles.controlButton, ...styles.floatingBtn, right: '20px'}}
              onClick={() => setIsFullScreen(true)}
              title="Full Screen"
            >
              <IconMaximize />
            </button>
          )}

          {/* PREVIEW */}
          {selectedImage ? (
            <div style={{textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <img src={selectedImage.url} alt="Preview" style={styles.previewImage} />
              <h3 style={{marginTop: '15px', color: '#333'}}>{selectedImage.name}</h3>
            </div>
          ) : (
            <div style={{ color: '#6b7280' }}>Click an image</div>
          )}
        </div>
      </div>

      {/* --- FULL SCREEN OVERLAY --- */}
{isFullScreen && selectedImage && (
        <div style={styles.fullScreenOverlay} onClick={() => setIsFullScreen(false)}>
          <button style={styles.closeFsButton}>
            <IconClose />
          </button>
          <img 
            src={selectedImage.url} 
            alt="Full Screen" 
            style={styles.fullScreenImg}
            // Stop propagation so clicking the image doesn't close the viewer
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
};

export default Page;