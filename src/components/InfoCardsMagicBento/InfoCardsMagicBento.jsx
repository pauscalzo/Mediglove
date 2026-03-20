import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MagicCard from "../MagicCard/MagicCard";
import styles from "./InfoCardsMagicBento.module.css";

export default function InfoCardsMagicBento({
  glowColor = "126, 194, 192",
  disableAnimations = false,
  layout = "horizontal", // 'horizontal' o 'vertical'
  items = null, // Array custom de tarjetas o null para usar default
  visibleItems = null, // Array de índices para mostrar, o null para mostrar todas
  selectedOnClick = null, // Callback cuando se clickéa una tarjeta en layout vertical
  initialSelectedCard = 0, // Índice de la tarjeta a abrir inicialmente
}) {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);

  useEffect(() => {
    setSelectedCard(initialSelectedCard);
  }, [initialSelectedCard]);

  const defaultCards = useMemo(
    () => [
      {
        title: "Documentos\ntécnicos",
        desc: "Aquí podrá disponer de herramientas útiles\npara sus requerimientos técnicos.",
      },
      {
        title: "FAQ",
        desc: "Te facilitamos algunas de las preguntas\nfrecuentes para despejar dudas sobre\nnuestros productos.",
      },
      {
        title: "Calidad bajo normas\ninternacionales",
        desc: "Nuestra calidad bajo normas internacionales\ny nuestro precio FOB Argentina.",
      },
    ],
    []
  );

  // Usar items custom o default
  const allCards = items || defaultCards;

  // Filtrar tarjetas visibles
  const displayCards = useMemo(() => {
    if (visibleItems) {
      return visibleItems
        .map(idx => allCards[idx])
        .filter(Boolean);
    }
    return allCards;
  }, [allCards, visibleItems]);


  return (
    <section className={`${styles.section} ${styles[`layout-${layout}`]}`}>
      {layout === "horizontal" ? (
        // Layout horizontal - grid de 3 columnas
        <div className={styles.grid}>
          {displayCards.map((c, idx) => (
            <MagicCard
              key={idx}
              glowColor={glowColor}
              enableStars
              enableSpotlight
              enableBorderGlow
              clickEffect
              spotlightRadius={180}
              particleCount={12}
              disableAnimations={disableAnimations}
              className={styles.card}
            >
              <button 
                className={styles.cardInner}
                onClick={() => navigate(`/asesoramiento?openCard=${idx}`)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%' }}
              >
                <div className={styles.textBlock}>
                  <h3 className={styles.title}>{c.title}</h3>
                  <p className={styles.desc}>{c.desc}</p>
                </div>

                <div className={styles.footer}>
                  <span className={styles.more}>Ver más</span>
                  <span className={styles.arrow} aria-hidden="true" />
                </div>
              </button>
            </MagicCard>
          ))}
        </div>
      ) : (
        // Layout vertical - sidebar + content
        <div className={styles.verticalLayout}>
          <div className={styles.cardsContainer}>
            {displayCards.map((c, idx) => (
              <MagicCard
                key={idx}
                glowColor={glowColor}
                enableStars
                enableSpotlight
                enableBorderGlow
                clickEffect
                spotlightRadius={180}
                particleCount={12}
                disableAnimations={disableAnimations}
                className={`${styles.verticalCard} ${selectedCard === idx ? styles.active : ""}`}
              >
                <button
                  className={styles.cardButton}
                  onClick={() => {
                    setSelectedCard(idx);
                    selectedOnClick?.(idx, c);
                  }}
                >
                  <div className={styles.cardInner}>
                    <h3 className={styles.title}>{c.title}</h3>
                    <p className={styles.desc}>{c.desc}</p>
                    <div className={styles.footer}>
                      <span className={styles.more}>Ver más</span>
                      <span className={styles.arrow} aria-hidden="true" />
                    </div>
                  </div>
                </button>
              </MagicCard>
            ))}
          </div>

          {displayCards[selectedCard] && (
            <div className={styles.contentArea}>
              <h2 className={styles.contentTitle}>{displayCards[selectedCard].title}</h2>
              <div className={styles.contentBody}>
                {displayCards[selectedCard].content || displayCards[selectedCard].desc}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
