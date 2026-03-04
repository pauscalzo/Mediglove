import React from 'react';
import styles from './AboutHero.module.css';
import { getImageUrl } from '../../utils/imageHelper';

export default function AboutHero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>Quiénes somos</h1>
        <p className={styles.description}>
          Somos una empresa originada en abril de 1976 <br />
          dedicada a la industria del látex.
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <img 
          src={getImageUrl('./img/banner-nitrilo-fuchsia.png')} 
          alt="Quiénes somos" 
          className={styles.image}
        />
      </div>
    </div>
  );
}
