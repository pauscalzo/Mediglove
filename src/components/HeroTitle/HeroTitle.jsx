import { motion } from "motion/react";
import RotatingText from "../RotatingText/RotatingText";
import styles from "./HeroTitle.module.css";

function HeroTitle() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        La mas amplia gama en guantes descartables, todo en un mismo lugar{" "}
        <motion.span
          className={styles.highlight}
          layout="size"                 // 👈 clave: anima width/height
          layoutId="hero-highlight-pill" // opcional, pero ayuda a estabilizar
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.6,
          }}
        >
          <RotatingText
            texts={[
              "con la mejor calidad",
              "con calidad de atencion",
              "y entrega inmediata",
            ]}
            rotationInterval={3600}
            splitBy="characters"
            staggerDuration={0.015}
            staggerFrom="last"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}

            mainClassName={styles.rotateMain}
            splitLevelClassName={styles.rotateClip}
            elementLevelClassName={styles.rotateEl}
          />
        </motion.span>
      </h1>
    </section>
  );
}

export default HeroTitle;


