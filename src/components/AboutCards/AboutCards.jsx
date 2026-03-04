import React from 'react';
import styles from './AboutCards.module.css';
import { getImageUrl } from '../../utils/imageHelper';

const cardsData = [
  {
    id: 1,
    icon: getImageUrl('./img/icono-quienessomos-01.png'),
    title: 'Innovación permanente',
    description: 'Adoptamos los más altos estándares de calidad. Esto nos permite estar a la vanguardia en productos de látex. Somos conscientes que competir no es sólo cumplir con un requerimiento, vamos mucho más allá pensando en su seguridad y en lo que usted necesita.'
  },
  {
    id: 2,
    icon: getImageUrl('./img/icono-quienessomos-02.png'),
    title: 'Máxima seguridad',
    description: 'Nuestros guantes poseen una muy reducida o nula posibilidad a reacciones alérgicas. Las proteínas del látex son reducidas al mínimo, lo que minimiza el riesgo de "desenrollar hipersensibilidad a la proteína del látex".'
  },
  {
    id: 3,
    icon: getImageUrl('./img/icono-quienessomos-03.png'),
    title: 'Servicio Mediglove',
    description: 'Nuestra atención y servicio de venta están diseñados para que usted obtenga las mayores ventajas. Creamos soluciones a su medida en precio, calidad y entrega en término. Obtenga la prueba real de un bien negocio.'
  }
];

export default function AboutCards() {
  return (
    <div className={styles.cardsContainer}>
      {cardsData.map(card => (
        <div key={card.id} className={styles.card}>
          <div className={styles.iconWrapper}>
            <img src={card.icon} alt={card.title} className={styles.icon} />
          </div>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardDescription}>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
