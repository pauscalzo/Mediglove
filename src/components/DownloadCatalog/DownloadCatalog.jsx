import React from 'react';
import styles from './DownloadCatalog.module.css';
import ClickSpark from '../ClickSpark/ClickSpark';
import GradientText from '../GradientText/GradientText';

function DownloadCatalog({ onClick }) {
  return (
    <ClickSpark>
      <button className={styles.downloadBtn} onClick={() => {
        window.open(`${process.env.PUBLIC_URL}/img/catalogo-triptico-web.pdf`, '_blank');
      }}>
        <div className={styles.rowContent}>
          <span className={styles.iconCircle}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="catalogIconGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8ec9c3" />
                  <stop offset="0.5" stopColor="#c9298e" />
                  <stop offset="1" stopColor="#8ec9c3" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="24" fill="url(#catalogIconGradient)" />
              <path d="M24 16v16m0 0l-8-8m8 8l8-8" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <GradientText colors={["#8ec9c3", "#c9298e", "#8ec9c3"]} animationSpeed={6.5} direction="horizontal" className={styles.downloadText}>
            Descargar catálogo<br />de productos
          </GradientText>
        </div>
      </button>
    </ClickSpark>
  );
}

export default DownloadCatalog;
