import React, { useState } from 'react';
import InfoCardsMagicBento from '../components/InfoCardsMagicBento/InfoCardsMagicBento';
import styles from './AsesoramientoPage.module.css';

const asesorContent = [
  {
    title: 'Documentos técnicos',
    desc: 'Aquí podrá descargar herramientas útiles para sus requerimientos técnicos.',
    content: (
      <div className={styles.contentSection}>
        <p>Aquí podrá descargar de herramientas útiles para sus requerimientos técnicos. Como ya sabrá, los guantes de uso médico cumplen normas internacionales de calidad y dentro de la diversidad de materiales que los componen existen mayores ventajas según su uso.</p>
        <p><strong>Para su comodidad están en formato PDF.</strong></p>
        <div className={styles.itemsList}>
          <div className={styles.item}>
            <div className={styles.itemIcon}>📄</div>
            <div className={styles.itemText}>¿Qué es el AQL? Descripción de la Norma de Calidad AQL</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemIcon}>📄</div>
            <div className={styles.itemText}>Tabla comparativa según USO y COMPONENTE de Guantes</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemIcon}>📄</div>
            <div className={styles.itemText}>Tabla comparativa de Resistencia Química para Guantes</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemIcon}>📄</div>
            <div className={styles.itemText}>Medidor de Telles para Guantes de Cirugia y Examen</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemIcon}>📄</div>
            <div className={styles.itemText}>Relación Guante para Cirugía y Electrodistintivo</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'FAQ',
    desc: 'Te hacemos algunas de las preguntas frecuentes para despejar dudas sobre nuestros productos.',
    content: (
      <div className={styles.contentSection}>
        <div className={styles.faqItem}>
          <h4>¿Cuál es la función de un guante de látex de uso médico?</h4>
          <p>Según FDA (Food and Drug Administration) de los Estados Unidos de América definen al guante de uso médico en un material lleve...etc</p>
        </div>
        <div className={styles.faqItem}>
          <h4>¿Cómo deben cuidar sus manos los médicos?</h4>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
        <div className={styles.faqItem}>
          <h4>¿Cómo se debe elegir un buen guante de uso médico?</h4>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
      </div>
    )
  },
  {
    title: 'Calidad bajo normas internacionales',
    desc: 'Nuestra calidad bajo normas internacionales y nuestro precio FOB Argentina.',
    content: (
      <div className={styles.contentSection}>
        <h3>Certificaciones</h3>
        <p>Las certificaciones y cheques de calidad aseguran la calidad de nuestros productos evitando así posibles fallas frecuentes en otras marcas.</p>
        <div className={styles.certLogos}>
          <div className={styles.cert}>FDA</div>
          <div className={styles.cert}>CE</div>
          <div className={styles.cert}>ISO 900</div>
        </div>
        <h3 style={{ marginTop: '32px' }}>Atención al cliente</h3>
        <p>Nuestra atención y servicio, están diseñados para que usted tenga las mayores prestaciones, así como una experiencia positiva.</p>
        <ul>
          <li>Damos soluciones a medida en precio, calidad y entrega de productos a domicilio.</li>
          <li>Así como también pedidos programados de forma semanal, mensual y anual.</li>
          <li>Tenemos vocación en atender todas las demandas, exigencias y necesidades de nuestros clientes.</li>
          <li>Trato cordial y amigable acompañando su decisión</li>
        </ul>
      </div>
    )
  },
  {
    title: '¿Qué son y por qué usar guantes?',
    desc: 'Látex natural sin polvo o de látex sintético libres de látex y polvo.',
    content: (
      <div className={styles.contentSection}>
        <p>Normalmente, los guantes estériles y no estériles son principalmente desechables de cauchos natural por su gran elasticidad y lubricantes en piso de admisión de matriz, recomendado y aprobado por la FDA, para facilitar su colocación.</p>
        <p>La tendencia mundial es hacia uso de guantes en látex y sin polvo o nuestros materiales sintéticos como el nitrilo, acido nitrilo, polivinilo, polietileno, cloropreno etc.</p>
        <p><strong>Un desarrollo especial que provee Mediglove, son los guantes "libres de polvo" extudados POWDER-FREE composición de cauchos natural y guantes de látex sintético también "libres de polvo" de látex natural obtuviéndose, recomendados para personas con problemas de alergia causadas por el uso de guantes empolvados y por cuestiones de prevención a todo usuario en general.</strong></p>
        <p>Los guantes ORC estériles llevan una carga pesada dentro de la sala de operaciones. Protegen al usuario y al paciente de alergenos y evitan que las bacterias y otros patógenos entren en el área de trabajo que rápido estén.</p>
        <p>Existen personas son alérgicas al uso de estos guantes, incluso por causa de alergia látex reacciones graves de alergia (síndrome tardío-glicanos de alergia y hasta un cargo aislado por el mercado guantes empolveados con productos de inferior calidad para abaratar costos, donde se utiliza talco mineral de alto peligro alérgico.</p>
      </div>
    )
  },
  {
    title: 'Certificaciones y normas',
    desc: 'Todo sobre nuestras certificaciones internacionales.',
    content: (
      <div className={styles.contentSection}>
        <h3>Normas Internacionales</h3>
        <p>Mediglove cumple con las más altas normas internacionales de calidad y seguridad.</p>
        <ul>
          <li><strong>FDA:</strong> Food and Drug Administration (Estados Unidos)</li>
          <li><strong>CE:</strong> Conformidad Europea</li>
          <li><strong>ISO 9001:</strong> Sistemas de Gestión de Calidad</li>
          <li><strong>AQL 1.5:</strong> Estándar de Calidad de Inspección</li>
        </ul>
      </div>
    )
  }
];

export default function AsesoramientoPage() {
  return (
    <div className={styles.pageContainer}>
      <InfoCardsMagicBento 
        glowColor="200, 156, 178"
        layout="vertical"
        items={asesorContent}
      />
    </div>
  );
}
