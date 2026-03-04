import React from 'react';
import styles from './Timeline.module.css';
import { getImageUrl } from '../../utils/imageHelper';

const Timeline = () => {
  const events = [
    {
      id: 1,
      year: '1970',
      title: 'La industria del látex',
      description: 'Somos una empresa originada en abril de 1976 dedicada a la industria del látex. Comenzamos fabricación bombachas para bebes, guantes de carnaval y para fiestas, guantes deportivos entre otros productos.',
      image: 'linea-tiempo-01.png',
    },
    {
      id: 2,
      year: '1980',
      title: 'Nos alianzamos',
      description: 'Nos alianzamos como asesores técnicos en América, instalando plantas "have in mano", desarrollo de maquinarias, asesoramiento técnico y transferencia de tecnología generando asociaciones como el BAM y FDA.',
      image: 'linea-tiempo-02.png',
    },
    {
      id: 3,
      year: '1990',
      title: 'Avanzamos',
      description: 'Dimos un nuevo paso especializándonos en importación y distribución abrirá la puerta de guantes de uso doméstico para el mercado del retail.',
      image: 'linea-tiempo-03.png',
    },
    {
      id: 4,
      year: '2000',
      items: [
        {
          title: 'Un nuevo comienzo',
          description: 'Mediglove es fundada por el señor Mauricio F. Músich en abril de 2002. Respondiendo a las demandas del mercado hospitalario, comenzamos a comercializar guantes descartables, nuestro único producto.',
        },
        {
          title: 'Seguimos creciendo',
          description: 'Desde entonces la empresa, ha logrado posicionarse líder en el mercado en todo el país y exportando productos especiales de gran calidad para laboratorios, investigación médica y bioquímica entre otros, logra exportar a diversos países de Latinoamérica los mismos e incluso Franciacada de la marca.',
        }
      ],
      image: 'linea-tiempo-04.png',
    },
    {
      id: 5,
      year: '2010',
      items: [
        {
          title: 'Consolidados como marca líder',
          description: 'En la actualidad consideramos a Mediglove como marca líder en guantes descartables incorporando nuevos modelos para uso doméstico, estética, odontología, limpieza e industrial.',
        },
        {
          title: 'Aliados comerciales',
          description: 'Además, realizamos alianzas estratégicas con fabricantes locales e internacionales para distribución exclusiva de indumentaria descartable.',
        }
      ],
      image: 'linea-tiempo-05.png',
    },
    {
      id: 6,
      year: '2020',
      title: 'xxxx',
      description: 'En la actualidad consideramos a Mediglove como marca líder en guantes descartables incorporando nuevos modelos para uso doméstico, estética, odontología, limpieza e industrial.',
      image: 'linea-tiempo-06.png',
    },
  ];

  return (
    <>
      <h2 className={styles.sectionTitle}>Un breve recorrido por nuestra historia</h2>
      <section className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>
        <div className={styles.timelineContent}>
          {events.map((event) => (
            <div 
              key={event.id} 
              className={styles.timelineItem}
            >
              <div className={styles.timelinePoint}></div>
              <div className={styles.yearLabel}>{event.year}</div>
              <div className={styles.timelineCard}>
                {event.items ? (
                  <>
                    {event.items.map((item, index) => (
                      <div key={index} className={styles.timelineSubItem}>
                        <h4 className={styles.title}>{item.title}</h4>
                        <p className={styles.description}>{item.description}</p>
                      </div>
                    ))}
                    <div className={styles.cardImage}>
                      <img 
                        src={getImageUrl(`img/${event.image}`)} 
                        alt={event.year}
                        className={styles.image}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className={styles.title}>{event.title}</h4>
                    <p className={styles.description}>{event.description}</p>
                    <div className={styles.cardImage}>
                      <img 
                        src={getImageUrl(`img/${event.image}`)} 
                        alt={event.title}
                        className={styles.image}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </>
  );
};

export default Timeline;
