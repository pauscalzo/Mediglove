import LogoLoop from '../LogoLoop/LogoLoop';
import styles from './Brands.module.css';
import { getImageUrl } from '../../utils/imageHelper';
import { useState, useEffect } from 'react';

const brandLogos = [
  { src: getImageUrl('./img/brand-01.png'), alt: 'FDA', href: '#' },
  { src: getImageUrl('./img/brand-02.png'), alt: 'AQL 1.5 GMP', href: '#' },
  { src: getImageUrl('./img/brand-03.png'), alt: 'ANMAT', href: '#' },
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
        height: isMobile ? '50px' : '60px', 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#0b1a1a', 
        borderRadius: '24px', 
        padding: '8px',
        width: '100%'
      }}>
        <LogoLoop
          logos={brandLogos}
          speed={isMobile ? 0 : 1}
          direction="left"
          logoHeight={isMobile ? 24 : 32}
          gap={isMobile ? 30 : 60}
          repeatCount={isMobile ? 1 : 6}
          fadeOut={!isMobile}
          scaleOnHover
          ariaLabel="Certificaciones"
        />
      </div>
    </section>
  );
}

export default Brands;
