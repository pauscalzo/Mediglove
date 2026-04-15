import LogoLoop from '../LogoLoop/LogoLoop';
import styles from './Brands.module.css';
import { getImageUrl } from '../../utils/imageHelper';
import { useState, useEffect } from 'react';

const brandLogos = [
  { src: getImageUrl('./img/fda-w.png'), alt: 'FDA', href: '#' },
  { src: getImageUrl('./img/iso-w.png'), alt: 'ISO', href: '#' },
  { src: getImageUrl('./img/ce-w.png'), alt: 'CE', href: '#' },
  { src: getImageUrl('./img/aql-w.png'), alt: 'AQL', href: '#' },
  { src: getImageUrl('./img/gmp-w.png'), alt: 'GMP', href: '#' },
  { src: getImageUrl('./img/anmat-w.png'), alt: 'ANMAT', href: '#' },
];

const MOBILE_BREAKPOINT = 992;

function Brands() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.brands} aria-label="Certificaciones">
      <div style={{ 
        height: '50px', 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#0b1a1a', 
        borderRadius: '24px', 
        padding: '8px',
        width: '100%'
      }}>
        <LogoLoop
          logos={brandLogos}
          speed={1}
          direction="left"
          logoHeight={isMobile ? 24 : 32}
          gap={isMobile ? 30 : 60}
          repeatCount={isMobile ? 4 : 6}
          fadeOut={!isMobile}
          scaleOnHover
          ariaLabel="Certificaciones"
        />
      </div>
    </section>
  );
}

export default Brands;
