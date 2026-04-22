import styles from './BrandsStatic.module.css';
import { getImageUrl } from '../../utils/imageHelper';

const brandLogos = [
  { src: getImageUrl('./img/fda-w.png'), alt: 'FDA' },
  { src: getImageUrl('./img/iso-w.png'), alt: 'ISO' },
  { src: getImageUrl('./img/ce-w.png'), alt: 'CE' },
  { src: getImageUrl('./img/aql-w.png'), alt: 'AQL' },
  { src: getImageUrl('./img/gmp-w.png'), alt: 'GMP' },
  { src: getImageUrl('./img/anmat-w.png'), alt: 'ANMAT' },
];

export default function BrandsStatic() {
  return (
    <div className={styles.brandsStatic}>
      {brandLogos.map((logo, index) => (
        <img key={index} src={logo.src} alt={logo.alt} className={styles.logo} />
      ))}
    </div>
  );
}
