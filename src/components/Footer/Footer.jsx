import SpotlightCard from "../SpotlightCard/SpotlightCard";
import styles from "./Footer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLocationDot,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <div className={styles.cards}>
          {/* Card 1 */}
          <SpotlightCard
            className={styles.card}
            spotlightColor="rgba(0, 229, 255, 0.18)"
          >
            <div className={styles.logoBox}>
              {/* Si tenés el logo como imagen, reemplazá por <img /> */}
              <div className={styles.logoMark} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className={styles.logoText}>MEDIGLOVE</div>
            </div>

            <p className={styles.desc}>
              Especialistas en guantes descartables para industria, medicina,
              hogar (domésticos),
            </p>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard className={styles.card} spotlightColor="rgba(0, 229, 255, 0.16)">
            <div className={styles.cardHeader}>
              <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
              <div className={styles.cardTitle}>Dirección</div>
            </div>

            <a href="https://www.google.com/maps/search/Pedro+Mendoza+1883+Hurlingham+Buenos+Aires" target="_blank" rel="noopener noreferrer" className={styles.addressLink}>
              <div className={styles.lines}>
                <div>Pedro Mendoza 1883</div>
                <div>CP:B1686NGC - Hurlingham</div>
                <div>Buenos Aires - Argentina</div>
              </div>
            </a>
          </SpotlightCard>

          {/* Card 3 */}
          <SpotlightCard className={styles.card} spotlightColor="rgba(0, 229, 255, 0.16)">
            <div className={styles.cardHeader}>
              <FontAwesomeIcon icon={faPaperPlane} className={styles.icon} />
              <div className={styles.cardTitle}>Contáctenos</div>
            </div>

            <div className={styles.lines}>
              <div><a href="mailto:ventas@mediglove.com.ar" className={styles.link}>ventas@mediglove.com.ar</a></div>
              <div><a href="https://wa.me/541131990590" target="_blank" rel="noopener noreferrer" className={styles.link}>(5411) 3199-0590</a></div>
              <div>De 10 a 15 hs</div>
            </div>
          </SpotlightCard>

          {/* Card 4 */}
          <SpotlightCard className={styles.card} spotlightColor="rgba(0, 229, 255, 0.16)">
            <div className={styles.cardHeader}>
              <FontAwesomeIcon icon={faHeart} className={styles.icon} />
              <div className={styles.cardTitle}>Seguinos</div>
            </div>

            <div className={styles.socials}>
              <a className={styles.socialBtn} href="https://www.facebook.com/guantesmediglove.mediglovesrl" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a className={styles.socialBtn} href="https://instagram.com/mediglovearg" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomText}>
          Copyright 2026 - MEDIGLOVE SRL | Todos los derechos reservados. Diseño y desarrollo Estudio Panambí
        </div>
      </div>
    </footer>
  );
}
