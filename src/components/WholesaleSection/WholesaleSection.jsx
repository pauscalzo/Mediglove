import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "../Carousel/Carousel";
import styles from "./WholesaleSection.module.css";
import ClickSpark from '../ClickSpark/ClickSpark';

export default function WholesaleSection() {
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleContactClick = () => {
    navigate('/contacto');
  };

  const closeVideo = () => {
    setShowVideo(false);
  };
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left */}
        <div className={styles.left}>
          <h2 className={styles.title}>
            Compras mayoristas
            <br />
            y distribuidores
          </h2>

          <div className={styles.divider} />

          <p className={styles.subtitle}>
            Compras por mayor con envíos
            <br />
            a todo el país.
          </p>

          <p className={styles.body}>
            Contactanos para poder cotizar a la medida de tus necesidades. 
            Contamos con stock permanente y una red de distribución eficaz.
            <br />
            Te invitamos también a ver el video para contacto mayorista.
          </p>

          <div className={styles.actions}>
            <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
              <button type="button" className={styles.btnOutline} onClick={handleVideoClick}>
                Ver video
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
              <button type="button" className={styles.btnFilled} onClick={handleContactClick}>
                Contacto
              </button>
            </ClickSpark>
          </div>
        </div>

        {/* Right */}
        <div className={styles.right}>
          <div className={styles.carouselCard}>
            <Carousel
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={false}
              loop={true}
              round={false}
            />
          </div>
        </div>

      </div>

      {showVideo && (
        <div className={styles.videoModalOverlay} onClick={closeVideo}>
          <div className={styles.videoModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeVideo}>✕</button>
            <video width="100%" height="auto" controls autoPlay>
              <source src="https://www.mediglove.com.ar/videos/mayoristas_sm.mp4" type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

