import { motion } from 'motion/react';
import GradientText from '../GradientText/GradientText';
import styles from './BannerHome.module.css';
import { getImageUrl } from '../../utils/imageHelper';

function BannerHome() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.header}>
        <GradientText
          colors={['#8ec9c3', '#c9298e', '#8ec9c3']}
          animationSpeed={6.5}
          direction="horizontal"
          yoyo
          className={styles.starIconWrapper}
        >
          <span className={styles.starIcon} aria-hidden="true">★</span>
        </GradientText>

        <h2 className={styles.subtitle}>Novedades</h2>
      </div>

      <motion.div
        className={styles.bannerContainer}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <img
          src={getImageUrl('./img/banner-nitrilo-fuchsia.png')}
          alt="Banner Nitrilo Fuchsia"
          className={styles.bannerImage}
        />
      </motion.div>
    </section>
  );
}

export default BannerHome;

