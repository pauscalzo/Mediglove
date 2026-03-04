import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductSlider.module.css';
import { getImageUrl } from '../../utils/imageHelper';

const baseCards = [
  {
    id: 'nitrilo',
    label: 'PRODUCTOS',
    title: 'NITRILO',
    image: getImageUrl('./img/guante-nitrilo.png'),
    badge: getImageUrl('./img/nitrilo.png'),
    color: '#228bb0',
    link: '/categoria/nitrilo',
  },
  {
    id: 'esteril',
    label: 'PRODUCTOS',
    title: 'ESTERIL',
    image: getImageUrl('./img/guante-esteril.png'),
    badge: getImageUrl('./img/esteril.png'),
    color: '#58b2ab',
    link: '/categoria/esteriles',
  },
  {
    id: 'domesticos',
    label: 'PRODUCTOS',
    title: 'DOMESTICOS',
    image: getImageUrl('./img/guante-domestico.png'),
    badge: getImageUrl('./img/domestico.png'),
    color: '#e79bc4',
    link: '/categoria/domesticos',
  },
];

function ProductSlider() {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const cards = useMemo(() => [...baseCards, ...baseCards], []);

  const handleScroll = (direction) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const card = track.querySelector(`.${styles.card}`);
    const cardWidth = card ? card.offsetWidth : 280;
    const gap = 24;
    const offset = (cardWidth + gap) * direction;

    track.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className={styles.slider} aria-label="Productos">
      <div className={styles.track} ref={trackRef}>
        {cards.map((card, index) => (
          <button
            key={`${card.id}-${index}`}
            className={styles.card}
            style={{ backgroundColor: card.color }}
            onClick={() => navigate(card.link)}
            type="button"
          >
            <div className={styles.cardHeader}>
              <span className={styles.label}>{card.label}</span>
              <span className={styles.title}>{card.title}</span>
            </div>
            <div className={styles.imageWrap}>
              <img src={card.image} alt={card.title} className={styles.image} />
            </div>
            <div className={styles.badgeWrap}>
              <img src={card.badge} alt={`${card.title} icon`} className={styles.badge} />
            </div>
          </button>
        ))}
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.controlButton} onClick={() => handleScroll(-1)} aria-label="Anterior">
          <span aria-hidden="true">&#x2039;</span>
        </button>
        <button type="button" className={styles.controlButton} onClick={() => handleScroll(1)} aria-label="Siguiente">
          <span aria-hidden="true">&#x203A;</span>
        </button>
      </div>
    </section>
  );
}

export default ProductSlider;
