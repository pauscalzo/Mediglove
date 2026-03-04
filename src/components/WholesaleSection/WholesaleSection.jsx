import Carousel from "../Carousel/Carousel";
import styles from "./WholesaleSection.module.css";
import ClickSpark from '../ClickSpark/ClickSpark';

export default function WholesaleSection() {
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
              <button type="button" className={styles.btnOutline}>
                Ver video
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
              <button type="button" className={styles.btnFilled}>
                Contacto
              </button>
            </ClickSpark>
          </div>
        </div>

        {/* Right */}
        <div className={styles.right}>
          <div className={styles.carouselCard}>
            <Carousel
              autoplay={false}
              autoplayDelay={3000}
              pauseOnHover={false}
              loop={false}
              round={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

