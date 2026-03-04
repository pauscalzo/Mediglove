import React from 'react';
import styles from './TitleProducts.module.css';
import { getImageUrl } from '../../utils/imageHelper';

const productStyles = {
  nitrilo: {
    color: '#28718A',
    icon: getImageUrl('./img/nitrilo.png'),
    label: 'LATEX FREE',
  },
  esteriles: {
    color: '#5CB3A6',
    icon: getImageUrl('./img/esteriles.png'),
    label: 'ESTERIL',
  },
  domesticos: {
    color: '#C89CB2',
    icon: getImageUrl('./img/domesticos.png'),
    label: 'DOMESTICOS',
  },
  pe: {
    color: '#B04C5B',
    icon: getImageUrl('./img/pe.png'),
    label: 'PE',
  },
  vinilo: {
    color: '#8C7BAA',
    icon: getImageUrl('./img/vinilo.png'),
    label: 'VINILO',
  },
  'natural-latex': {
    color: '#6B7BAA',
    icon: getImageUrl('./img/natural-latex.png'),
    label: 'NATURAL LATEX',
  },
};

export default function TitleProducts({ title }) {
  // Extract category from title
  const lowerTitle = title.toLowerCase();
  let category = null;
  let categoryLabel = '';
  
  if (lowerTitle.includes('nitrilo')) {
    category = 'nitrilo';
    categoryLabel = 'NITRILO';
  } else if (
    lowerTitle.includes('estéril') ||
    lowerTitle.includes('esteril') ||
    lowerTitle.includes('esteriles') ||
    lowerTitle.includes('estériles')
  ) {
    category = 'esteriles';
    categoryLabel = 'ESTÉRILES';
  } else if (
    lowerTitle.includes('doméstico') ||
    lowerTitle.includes('domestico') ||
    lowerTitle.includes('domesticos') ||
    lowerTitle.includes('domésticos')
  ) {
    category = 'domesticos';
    categoryLabel = 'DOMÉSTICOS';
  } else if (lowerTitle.includes('pe')) {
    category = 'pe';
    categoryLabel = 'PE';
  } else if (lowerTitle.includes('vinilo')) {
    category = 'vinilo';
    categoryLabel = 'VINILO';
  } else if (
    lowerTitle.includes('natural latex') ||
    lowerTitle.includes('natural-latex')
  ) {
    category = 'natural-latex';
    categoryLabel = 'NATURAL LATEX';
  }

  const style = category ? productStyles[category] : null;

  return (
    <div
      className={styles.titleContainer}
      style={{ background: style ? style.color : '#eee' }}
    >
      {style && (
        <img src={style.icon} alt={style.label} className={styles.icon} />
      )}
      <div>
        <div className={styles.label}>PRODUCTOS</div>
        <div className={styles.productTitle}>{categoryLabel}</div>
      </div>
    </div>
  );
}
