import React, { useState, useRef, useEffect } from 'react';
import styles from './ImageGallery.module.css';

const getYoutubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const thumbnailsRef = useRef(null);
  
  // Normalizar imágenes: convertir strings a objetos
  const normalizedImages = images.map(img => {
    if (typeof img === 'string') {
      // Detectar si es una URL de YouTube
      const isYoutubeUrl = img.includes('youtube.com') || img.includes('youtu.be');
      return { 
        type: isYoutubeUrl ? 'video' : 'image', 
        src: img 
      };
    }
    return img;
  });

  const currentItem = normalizedImages[selectedIndex];
  const isCurrentVideo = currentItem?.type === 'video';
  const currentVideoId = isCurrentVideo ? getYoutubeVideoId(currentItem.src) : null;
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleLightboxPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleLightboxNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleLightboxClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, normalizedImages.length]);

  // Touch navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Si el dedo se movió más de 50px, considerarlo un swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe izquierda = siguiente imagen
        handleLightboxNext();
      } else {
        // Swipe derecha = imagen anterior
        handleLightboxPrevious();
      }
    }
    
    setTouchStart(0);
  };

  if (!normalizedImages || normalizedImages.length === 0) {
    return <div className={styles.empty}>No hay imágenes disponibles</div>;
  }

  const handlePrevious = () => {
    setSelectedIndex(prev => (prev === 0 ? normalizedImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev === normalizedImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (idx) => {
    setSelectedIndex(idx);
    setLightboxOpen(true);
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[idx];
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleLightboxPrevious = () => {
    setSelectedIndex(prev => (prev === 0 ? normalizedImages.length - 1 : prev - 1));
  };

  const handleLightboxNext = () => {
    setSelectedIndex(prev => (prev === normalizedImages.length - 1 ? 0 : prev + 1));
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setLightboxOpen(false);
    }
  };

  return (
    <>
      <div className={styles.gallery}>
        {/* Imagen/Video principal con controles */}
        <div className={styles.mainImageWrapper}>
          <button 
            className={styles.navButton + ' ' + styles.prevButton}
            onClick={handlePrevious}
            aria-label="Anterior"
            type="button"
          >
            ‹
          </button>
          {isCurrentVideo && currentVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${currentVideoId}`}
              className={styles.mainImage}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onClick={() => setLightboxOpen(true)}
            ></iframe>
          ) : (
            <img 
              src={currentItem?.src} 
              alt="Producto" 
              className={styles.mainImage}
              onClick={() => setLightboxOpen(true)}
              style={{ cursor: 'pointer' }}
            />
          )}
          <button 
            className={styles.navButton + ' ' + styles.nextButton}
            onClick={handleNext}
            aria-label="Siguiente"
            type="button"
          >
            ›
          </button>
          <div className={styles.imageCounter}>
            {selectedIndex + 1} / {normalizedImages.length}
          </div>
        </div>

        {/* Miniaturas */}
        <div className={styles.thumbnailsContainer}>
          <div className={styles.thumbnailsWrapper}>
            <div className={styles.thumbnails} ref={thumbnailsRef}>
              {normalizedImages.map((item, idx) => {
                const isVideo = item.type === 'video';
                
                return (
                  <button
                    key={idx}
                    className={`${styles.thumbnail} ${selectedIndex === idx ? styles.active : ''}`}
                    onClick={() => handleThumbnailClick(idx)}
                    type="button"
                    aria-label={`${isVideo ? 'Video' : 'Imagen'} ${idx + 1}`}
                  >
                    {isVideo ? (
                      <div className={styles.videoThumbnail}>
                        <span className={styles.playIcon}>▶</span>
                      </div>
                    ) : (
                      <img src={item.src} alt={`Miniatura ${idx + 1}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className={styles.lightboxOverlay} 
          onClick={handleOverlayClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button 
            className={styles.lightboxClose}
            onClick={handleLightboxClose}
            aria-label="Cerrar"
            type="button"
          >
            ✕
          </button>
          <button 
            className={styles.lightboxNavButton + ' ' + styles.lightboxPrev}
            onClick={handleLightboxPrevious}
            aria-label="Anterior"
            type="button"
          >
            ‹
          </button>
          {isCurrentVideo && currentVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${currentVideoId}`}
              className={styles.lightboxVideo}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img 
              src={normalizedImages[selectedIndex]?.src} 
              alt="Producto ampliado" 
              className={styles.lightboxImage}
            />
          )}
          <button 
            className={styles.lightboxNavButton + ' ' + styles.lightboxNext}
            onClick={handleLightboxNext}
            aria-label="Siguiente"
            type="button"
          >
            ›
          </button>
          <div className={styles.lightboxCounter}>
            {selectedIndex + 1} / {normalizedImages.length}
          </div>
        </div>
      )}
    </>
  );
}
