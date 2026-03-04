import React, { useState, useRef } from 'react';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailsRef = useRef(null);
  
  if (!images || images.length === 0) {
    return <div className={styles.empty}>No hay imágenes disponibles</div>;
  }

  const mainImage = images[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (idx) => {
    setSelectedIndex(idx);
    // Scroll miniaturas al seleccionado
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[idx];
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <div className={styles.gallery}>
      {/* Imagen principal con controles */}
      <div className={styles.mainImageWrapper}>
        <button 
          className={styles.navButton + ' ' + styles.prevButton}
          onClick={handlePrevious}
          aria-label="Imagen anterior"
          type="button"
        >
          ‹
        </button>
        <img 
          src={mainImage} 
          alt="Producto" 
          className={styles.mainImage}
        />
        <button 
          className={styles.navButton + ' ' + styles.nextButton}
          onClick={handleNext}
          aria-label="Imagen siguiente"
          type="button"
        >
          ›
        </button>
        <div className={styles.imageCounter}>
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Miniaturas */}
      <div className={styles.thumbnailsContainer}>
        <div className={styles.thumbnailsWrapper}>
          <div className={styles.thumbnails} ref={thumbnailsRef}>
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`${styles.thumbnail} ${selectedIndex === idx ? styles.active : ''}`}
                onClick={() => handleThumbnailClick(idx)}
                type="button"
                aria-label={`Imagen ${idx + 1}`}
              >
                <img src={img} alt={`Miniatura ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
