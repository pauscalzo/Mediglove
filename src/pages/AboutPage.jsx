import React from 'react';
import styles from './AboutPage.module.css';
import AboutHero from '../components/AboutHero/AboutHero';
import AboutCards from '../components/AboutCards/AboutCards';
import AboutVideos from '../components/AboutVideos/AboutVideos';
import Timeline from '../components/Timeline/Timeline';
import InfoCardsMagicBento from '../components/InfoCardsMagicBento/InfoCardsMagicBento';
import DownloadCatalog from '../components/DownloadCatalog/DownloadCatalog';
import Footer from '../components/Footer/Footer';

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <AboutHero />
      <AboutCards />
      <AboutVideos />
      <Timeline />
      <InfoCardsMagicBento />
      <DownloadCatalog />
    </div>
  );
}
