import React, { useState } from 'react';
import MagicCard from '../MagicCard/MagicCard';
import styles from './AsesorLanding.module.css';


export default function AsesorLanding({ selectedCard, onCardSelect, cards }) {
  const glowColor = '200, 156, 178'; // rosa mediglove

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Asesoramiento</h1>
      <p className={styles.description}>
        Tras 5 décadas de experiencia, búsqueda, desarrollo de nuevos productos e introducción al mercado de los mismos, adquirimos amplios conocimientos técnicos para atender los requerimientos de nuestros clientes o usuarios.
      </p>

      <div className={styles.layout}>
        {/* Cards verticales - Izquierda */}
        <div className={styles.cardsContainer}>
          {cards.map((card, idx) => (
            <MagicCard
              key={idx}
              glowColor={glowColor}
              enableStars
              enableSpotlight
              enableBorderGlow
              clickEffect
              spotlightRadius={180}
              particleCount={12}
              className={`${styles.card} ${selectedCard === idx ? styles.active : ''}`}
            >
              <button
                className={styles.cardButton}
                onClick={() => onCardSelect(idx)}
              >
                <div className={styles.cardInner}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.description}</p>
                  <span className={styles.arrow}>→</span>
                </div>
              </button>
            </MagicCard>
          ))}
        </div>

        {/* Contenido - Derecha */}
        <div className={styles.contentArea}>
          {cards[selectedCard] && (
            <>
              <h2 className={styles.contentTitle}>{cards[selectedCard].title}</h2>
              <div className={styles.contentBody}>{cards[selectedCard].content}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
