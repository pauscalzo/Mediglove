import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCards.module.css';
import { getImageUrl } from '../../utils/imageHelper';

const cards = [
  {
    img: getImageUrl('./img/nitrilo.png'),
    link: '/productos/nitrilo',
    color: '#28718A',
    hover: '#2197C1',
    label: 'LATEX FREE'
  },
  {
    img: getImageUrl('./img/esteriles.png'),
    link: '/productos/esteriles',
    color: '#5CB3A6',
    hover: '#58B7B1',
    label: 'ESTERIL'
  },
  {
    img: getImageUrl('./img/domesticos.png'),
    link: '/productos/domesticos',
    color: '#C89CB2',
    hover: '#ED9BC3',
    label: 'DOMESTICOS'
  },
  {
    img: getImageUrl('./img/pe.png'),
    link: '/productos/pe',
    color: '#B04C5B',
    hover: '#D75067',
    label: 'PE'
  },
  {
    img: getImageUrl('./img/vinilo.png'),
    link: '/productos/vinilo',
    color: '#8C7BAA',
    hover: '#AC80B6',
    label: 'VINILO'
  },
  {
    img: getImageUrl('./img/natural-latex.png'),
    link: '/productos/natural-latex',
    color: '#6B7BAA',
    hover: '#8780B8',
    label: 'NATURAL LATEX'
  }
];

export default function ProductCards({ animate = true, closing = false, onClose }) {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  // Only render cards when animation should start
  // (always true outside modal, but keep for consistency)

  return (
    <div className={styles.cardsContainer}>
      {cards.map((card, idx) => (
        <a
          key={idx}
          onClick={e => {
            e.preventDefault();
            if (card.link) {
              const match = card.link.match(/\/productos\/(.*)/);
              if (match && match[1]) {
                navigate(`/categoria/${match[1]}`);
                if (onClose) onClose();
              }
            }
          }}
          className={
            `${styles.card} ${animate ? styles.fadeUp : ''} ${closing ? styles.fadeDown : ''}`
          }
          style={{ background: hovered === idx ? card.hover : card.color, animationDelay: `${idx * 0.08}s`, cursor: 'pointer' }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={card.img} alt={card.label} className={styles.cardImg} />
        </a>
      ))}
    </div>
  );
}
