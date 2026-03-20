import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InfoCardsMagicBento from '../components/InfoCardsMagicBento/InfoCardsMagicBento';
import styles from './AsesoramientoPage.module.css';
import { FaDownload } from 'react-icons/fa';

const faqData = [
  {
    id: 1,
    question: '¿Cuál es la función de un guante de látex de uso médico?',
    answer: 'Según FDA (Food and Drug Administration) de los Estados Unidos de América, define: un guante de uso médico es un material descartable hecho de látex natural o sintético, para proveer una barrera contra potenciales agentes infecciosos y otros contaminantes. Es empolvado para facilitar su colocación en las manos. El lubricante o polvo usado y recomendado es la fécula de maíz por ser bioabsorbible. Se fabrican distintos tipos de guantes médicos, según las diferentes necesidades.'
  },
  {
    id: 2,
    question: '¿Cómo deben cuidar sus manos los médicos?',
    answer: 'Sus manos son su instrumento más importante, el cuidarlas no es sólo una buena práctica, es una necesidad. Las bacterias se desarrollan con mucha facilidad en el ambiente húmedo y caluroso del interior de un guante, por lo que las manos se deben lavar antes y después de la utilización del guante, preferiblemente con jabón antimicrobios y se deben secar perfectamente. Además lavarse las manos con mucha frecuencia durante el invierno puede ocasionar irritaciones, y el uso de guantes puede incrementar éste problema, asegúrese de que sus manos estén totalmente secas antes de ponerse los guantes.'
  },
  {
    id: 3,
    question: '¿Cómo se debe elegir un buen guante de uso médico?',
    answer: 'Un guante médico no sólo debe ser seguro, sino también cómodo. El guante se debe poder colocar o usar con facilidad en la tarea médica, casi sin sentir que se usan guantes. Es necesaria una buena barrera de protección; el espesor del guante es una buena medida de esta protección. El contenido de proteínas debe ser tan bajo como sea posible para minimizar los riesgos asociados con las alergias a las proteínas del látex. El entalle es muy importante porque el guante debe llegar hasta la base de los dedos y adaptarse cómodamente a la palma de las manos y entre los dedos, sin quedar muy ajustados y llegar al camisolín.'
  },
  {
    id: 4,
    question: '¿Qué son y por qué es recomendable usar guantes POWDER-FREE?',
    answer: 'Normalmente, los guantes médicos son lubricados, para facilitar su colocación mediante el uso de polvo de fécula de maíz, recomendado por ser bioabsorbible. Existen personas que son alérgicas al uso de estos guantes, incluso por causa de la inhalación de las partículas de polvo y proteínas del látex. Cabe decir que existen en el mercado guantes empolvados con productos de inferior calidad, donde se utiliza talco mineral de alto peligro alérgico. Un desarrollo especial, que también provee nuestra firma, son los guantes “libres de polvo”, rotulados POWDER-FREE, recomendados a personas con problemas de alergia por el uso del guante empolvado y por cuestiones de prevención a todo usuario en general. Esto se logra al finalizar el proceso productivo. Los guantes son sometidos a un lavado especial, interno y externo, que produce un acabado superficial que facilita su colocación, evitando así el uso de polvo lubricante; este lavado disminuye sensiblemente las proteínas del látex y los productos químicos excedentes del proceso productivo. Su costo no es significativo respecto a los beneficios que genera al usuario.'
  },
  {
    id: 5,
    question: '¿Qué ventajas reúnen los guantes MEDIGLOVE®?',
    answer: 'Existe actualmente en el mercado una variedad de guantes de uso médico. Para satisfacer las necesidades sanitarias, MEDIGLOVE® S.R.L. pone a disposición una variada gama de guantes de examen y cirugía que garantizan muchas ventajas: • Calidad, por la excelencia del látex natural seleccionado de primera calidad utilizado, y los sucesivos controles durante su elaboración. • Comodidad, sensibilidad y ligereza, por su adaptación a los dedos y a las manos y brazos. • Elasticidad, por la pureza de las materias primas y el cuidado proceso de fabricación • Eliminación de afecciones alérgicas, por su bajo contenido de proteínas de látex, de residuos químicos y de elaboración. • Para cumplir las preferencias personales de los profesionales de la salud, nuestra línea abarca tanto aquellos que utilizan como lubricante polvo de almidón de maíz bioabsorbible, como también una variedad de guantes sin polvo.'
  },
  {
    id: 6,
    question: '¿Quiénes certifican la calidad de los guantes MEDIGLOVE®?',
    answer: 'Los guantes MEDIGLOVE® garantizan la máxima seguridad tanto para el profesional como para sus pacientes, al ser fabricados con la tecnología más avanzada. Se han implementado estrictos controles de calidad en todas las líneas de producción cumpliendo con los Estándares Internacionales, lo que asegura que nuestros clientes siempre recibirán un guante de calidad óptima. Estas normas son las ASTM (FDA) e ISO 9002. Nuestros productos están acreditados con los más importantes Certificados de Calidad del Mundo como las ISO 9002; SMG (Malaysia); TUV (Alemania); NF Mark (Francia); TGA (Australia); CE (Europa) y CGSB (Canadá), FDA (USA). Cuando la Calidad Cuenta, Nosotros Cumplimos.'
  },
  {
    id: 7,
    question: '¿Los guantes MEDIGLOVE® satisfacen las normas de calidad vigentes?',
    answer: 'Sí. Los guantes MEDIGLOVE® cumplen a satisfacción con las normas dimensiónales, propiedades originales, tanto físicas como químicas, módulo al 500%, envejecimiento en estufa, detección de agujeros y zonas porosas y desgarre de puño según norma IRAM 113089-95. Exija estos controles a todos sus proveedores.'
  },
  {
    id: 8,
    question: '¿MEDIGLOVE® está habilitada por el A.N.M.A.T.?',
    answer: 'Sí. Poseemos habilitación del ANMAT Disposición Nº 6.094/03. Si desea tener una copia del certificado respectivo, puede bajarlo de este sitio.'
  },
  {
    id: 9,
    question: '¿Cuál es el guante que debo usar y por qué?',
    answer: 'Nuestra firma ofrece cursos de capacitación. Personal técnico lo podrá orientar sobre todas las características de nuestros productos. Responderemos a sus preguntas aquí.'
  },
  {
    id: 10,
    question: '¿Cómo prevenir alergias?',
    answer: 'Para la prevención de alergias tanto en trabajadores de la salud como en otros pacientes, se deben seguir las siguientes pautas: 1. Cuando se necesiten manipular materiales infectados, preferentemente se deberán elegir aquellos guantes de látex que posean la menor carga proteica o bien, los libres de polvo. Tomando como referencia el mercado de los Estados Unidos, podemos citar los siguientes tipos: a) Guantes "hipoalergénicos" con bajo contenido de aditivos químicos. b) Guantes "bajas proteínas" con bajo contenido de proteínas. c) Guantes "sin polvo lubricante". 2. Cuando se usen guantes de látex se debe evitar el uso de cremas y lociones para manos que contengan aceite mineral, petrolados o lanolina, ya que el uso de los mismos potencian la degradación del látex, reducen la efectividad del guante como barrera de protección e incrementan el riesgo de contaminación. 3. Luego de quitarse los guantes de látex, se deben lavar las manos con jabón suave y secárselas minuciosamente.'
  },
  {
    id: 11,
    question: '¿Por qué los guantes POWDER-FREE son mejores?',
    answer: '1. Disminuye las alergias porque se reducen las proteínas del látex. El guante se lava por dentro y por fuera retirando los excedentes del proceso productivo (agentes vulcanizantes y coagulantes). 2. Mejora la sensibilidad al tacto. 3. Facilita su colocación y calce por su excelente sedosidad y, de la misma manera facilita su sacado. 4. Mejora la elasticidad. 5. Disminuye las posibilidades de perforación.'
  },
  {
    id: 12,
    question: '¿Soy hipersensible al látex?',
    answer: 'Si a pesar del uso del guante de látex libre de polvo (POWDER-FREE) y no puede resolver su problema de alergia es posible que sea alérgico al látex, por este motivo Ud. debería usar guantes sin látex natural.'
  },
  {
    id: 13,
    question: '¿Los envases de los guantes, son reciclables?',
    answer: 'Sí. Hemos desarrollado después de muchos años en la Argentina y coincidentemente con un pedido de la Fundación Favaloro, papel grado médico pelable (no despide fibra) este avance tecnológico es incorporado a todos los guantes de uso quirúrgico.'
  },
  {
    id: 14,
    question: '¿Existen problemas para el uso de guantes esterilizados por óxido de etileno?',
    answer: 'Está demostrado que el óxido de etileno como medio de esterilización, no produce daños al organismo, y que incluso tiene ciertas ventajas de tipo técnico. MEDIGLOVE® dispone del certificado de análisis de curva de desorción sobre la determinación de "óxido de etileno". La Resolución 255/94 del Ministerio de Salud de la Nación, establece que, tratándose de la esterilización con óxido de etileno, se debe asegurar que la concentración de residuos no supere los siguientes limites de 5 PPM (5 partes por millón). Puede verificarlo, clic aquí (PDF).'
  },
  {
    id: 15,
    question: '¿El guante ambidextro produce fatiga?',
    answer: 'El guante ambidiestro es confortable y no produce fatiga. A diferencia de lo que se piensa, su contraparte, el guante anatómico con pulgar en oposición, tiende a mantener su forma original o sea, la posición de descanso natural de la mano; esto se debe a que la fabricación del guante se realiza con moldes en esa posición. En las situaciones de trabajo se altera esta posición, provocando resistencia al movimiento y produciendo cansancio anticipado. No obstante, para satisfacer sus preferencias, también tenemos nuestros guantes MEDIGLOVE PLUS, con pulgar en oposición. El criterio de uso es más una decisión personal que científica. Lo invitamos a nuestro establecimiento a realizar una prueba comparativa.'
  },
  {
    id: 16,
    question: '¿Tienen todos los talles?',
    answer: 'Sí. Tenemos todos los talles. El rango de producción abarca los siguientes tipos y medidas.'
  },
  {
    id: 17,
    question: '¿Puedo realizar consultas técnicas?',
    answer: 'Sí. Nuestra firma ofrece cursos de capacitación, y personal técnico que lo podrá orientar sobre todas las características de nuestros productos y demostrar la realidad de la especial calidad de cualquiera de nuestros guantes MEDIGLOVE®.'
  }
];

function FAQAccordion() {
  const [expandedId, setExpandedId] = useState(1);

  return (
    <div className={styles.faqAccordion}>
      <div className={styles.faqList}>
        {faqData.map((item) => (
          <div
            key={item.id}
            className={`${styles.faqItem} ${expandedId === item.id ? styles.expanded : ''}`}
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className={styles.faqQuestion}>
              <span className={styles.faqNumber}>{String(item.id).padStart(2, '0')}.</span>
              <span className={styles.faqText}>{item.question}</span>
            </div>
            {expandedId === item.id && (
              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const asesorContent = [
  {
    title: 'Documentos técnicos',
    desc: 'Aquí podrá descargar herramientas útiles para sus requerimientos técnicos.',
    content: (
      <div className={styles.contentSection}>
        <p>Aquí podrá descargar de herramientas útiles para sus requerimientos técnicos. Como ya sabrá, los guantes de uso médico cumplen normas internacionales de calidad y dentro de la diversidad de materiales que los componen existen mayores ventajas según su uso.</p>
        <p><strong>Para su comodidad están en formato PDF.</strong></p>
        <div className={styles.itemsList}>
          <a href="/img/DOC_Mediglove_AQL.pdf" target="_blank" rel="noopener noreferrer" className={styles.item}>
            <div className={styles.itemIcon}><FaDownload /></div>
            <div className={styles.itemText}>¿Qué es el AQL? Descripción de la Norma de Calidad AQL</div>
          </a>
          <a href="/img/DOC_Mediglove_Comparativa_USO_COMPONENTE.pdf" target="_blank" rel="noopener noreferrer" className={styles.item}>
            <div className={styles.itemIcon}><FaDownload /></div>
            <div className={styles.itemText}>Tabla comparativa según USO y COMPONENTE de Guantes</div>
          </a>
          <a href="/img/DOC_Mediglove_Resistencia_Quimica.pdf" target="_blank" rel="noopener noreferrer" className={styles.item}>
            <div className={styles.itemIcon}><FaDownload /></div>
            <div className={styles.itemText}>Tabla comparativa de Resistencia Química para Guantes</div>
          </a>
          <a href="/img/DOC_Mediglove_Medidor_Talles.pdf" target="_blank" rel="noopener noreferrer" className={styles.item}>
            <div className={styles.itemIcon}><FaDownload /></div>
            <div className={styles.itemText}>Medidor de Telles para Guantes de Cirugia y Examen</div>
          </a>
          <a href="/img/DOC_Mediglove_Relacion_Guante_Cirugia_Electrodistintivo.pdf" target="_blank" rel="noopener noreferrer" className={styles.item}>
            <div className={styles.itemIcon}><FaDownload /></div>
            <div className={styles.itemText}>Relación Guante para Cirugía y Electrodistintivo</div>
          </a>
        </div>
      </div>
    )
  },
  {
    title: 'Preguntas Frecuentes',
    desc: 'Te hacemos algunas de las preguntas frecuentes para despejar dudas sobre nuestros productos.',
    content: <FAQAccordion />
  },
  {
    title: 'Calidad bajo normas internacionales',
    desc: 'Nuestra calidad bajo normas internacionales y nuestro precio FOB Argentina.',
    content: (
      <div className={styles.contentSection}>
        {/* Certificaciones Section */}
        <div className={styles.qualityBlock}>
          <div className={styles.qualityIconContainer}>
            <img src="./img/calidad01.png" alt="Certificaciones" />
          </div>
          <h3 className={styles.qualityTitle}>CERTIFICACIONES</h3>
          <p className={styles.qualityText}>Las certificaciones y cheques de calidad aseguran la calidad de nuestros productos evitando así, posibles fallas frecuentes en otras marcas.</p>
          <div className={styles.brandLogos}>
            <img src="./img/fda-b.png" alt="FDA" className={styles.brandLogo} />
            <img src="./img/anmat-b.png" alt="ANMAT" className={styles.brandLogo} />
            <img src="./img/iso-b.png" alt="ISO" className={styles.brandLogo} />
            <img src="./img/aql-b.png" alt="AQL" className={styles.brandLogo} />
            <img src="./img/ce-b.png" alt="CE" className={styles.brandLogo} />
            <img src="./img/gmp-b.png" alt="GMP" className={styles.brandLogo} />
          </div>
        </div>

        <div className={styles.qualitySeparator}></div>

        {/* Atención al Cliente Section */}
        <div className={styles.qualityBlock}>
          <div className={styles.qualityIconContainer}>
            <img src="./img/calidad02.png" alt="Atención al Cliente" />
          </div>
          <h3 className={styles.qualityTitle}>ATENCIÓN AL CLIENTE</h3>
          <p className={styles.qualityText}>Nuestra atención y servicio, están diseñados para que usted tenga las mayores prestaciones, así como una experiencia positiva.</p>
          <ul className={styles.qualityList}>
            <li>Damos soluciones a medida, en precio, calidad y entrega de productos a domicilio.</li>
            <li>Así como también pedidos programados de forma semanal, mensual y anual.</li>
            <li>Tenemos vocación en atender todas las demandas, exigencias y necesidades de nuestros clientes.</li>
            <li>Trato cordial y amigable acompañando su decisión</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: '¿Qué son y por qué usar guantes de látex natural sin polvo o de látex sintético libres de látex y polvo?',
    desc: '',
    content: (
      <div className={styles.contentSection}>
        <p><strong>Normalmente, los guantes estériles y no estériles son principalmente compuestos de caucho natural por su gran elasticidad y lubricados con polvo de almidón de maíz, recomendado y aprobado por la FDA, para facilitar su colocación.</strong></p>
        
        <p className={styles.pinkText}>La tendencia mundial es hacia uso de guantes sin látex y sin polvo o nuevos materiales sintéticos como el nitrilo, acrilo nitrilo, polivinilo, polietileno, clorosoprene, etc.</p>
        
        <div className={styles.imageContainerCircle}>
          <img src="./img/nota01.png" alt="Guantes médicos" />
        </div>
        
        <p>Un desarrollo especial que provee Mediglove, son los guantes "libres de polvo" rotulados POWDER-FREE compuestos de caucho natural y guantes de látex sintético también "libres de polvo" de látex natural obtuviéndose, recomendados para personas con problemas de alergia causados por el uso de guantes empolvados y por cuestiones de prevención a todo usuario en general.</p>
        
        <h4 className={styles.advantagesTitle}>Encuentre a continuación las ventajas de los guantes "Doble ODC caña larga 300mm"</h4>
        
        <ul className={styles.advantagesList}>
          <li>CEI puño de 300 mm de largo proporciona mayor superficie de protección, cubre la manga.</li>
          <li>Mayor resistencia física a la punción y al desgarro.</li>
          <li>Evitan problemas de alergia al usuário y contaminación del área de uso al ser libres de polvo y ser de doble clorado.</li>
          <li>Capaces de controlar la pegajosidad (agarre superficial).</li>
          <li>Tienen facilidad de calce.</li>
          <li>Brindan confort en las manos.</li>
        </ul>
        
        <div className={styles.imageContainerWhite}>
          <img src="./img/nota02.png" alt="Beneficios guantes" />
        </div>
        
        <p className={styles.pinkText}>Los guantes ODC estériles llevan una carga pesada dentro de su sala de operaciones. Protegen al usuario y al paciente de alergenos y evitan que las bacterias y otros patógenos entren en el área de trabajo quirúrgico estéril.</p>
        
        <p>Existen personas que son alérgicas al uso de estos guantes, incluso por causa de la inhalación de las partículas de polvo y proteínas. Los riesgos de alergia tienen distintos grados de afección y hasta en casos aislados puede ser mortal. Cabe decir que existen en el mercado guantes empolveados con productos de inferior calidad para abaratar su costo, donde se utiliza talco mineral de alto peligro alérgico.</p>
      </div>
    )
  }
];

export default function AsesoramientoPage() {
  const [searchParams] = useSearchParams();
  const openCard = parseInt(searchParams.get('openCard') || '0', 10);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Asesoramiento</h1>
        <p className={styles.description}>
          Tras 5 décadas de experiencia, búsqueda, desarrollo de nuevos productos e introducción al mercado de los mismos, adquirimos amplios conocimientos técnicos para atender los requerimientos de nuestros clientes o usuarios.
        </p>
      </div>
      <InfoCardsMagicBento 
        glowColor="200, 156, 178"
        layout="vertical"
        items={asesorContent}
        initialSelectedCard={openCard}
      />
    </div>
  );
}
