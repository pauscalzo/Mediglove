import React from 'react';
import styles from './ProductPage.module.css';
import { useParams } from 'react-router-dom';
import nitriloProducts from '../data/products-nitrilo.json';
import TitleProducts from '../components/TitleProducts/TitleProducts';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import ProductCards from '../components/ProductCards/ProductCards';
import InfoCardsMagicBento from '../components/InfoCardsMagicBento/InfoCardsMagicBento';
import DownloadCatalog from '../components/DownloadCatalog/DownloadCatalog';
import { processProductImages } from '../utils/imageHelper';

// Simulate all products in a single array for demo
const allProducts = [
  ...processProductImages(nitriloProducts),
  // ...add other category products here
];

const categoryTitles = {
  nitrilo: 'Productos Nitrilo',
  esteriles: 'Productos Estériles',
  domesticos: 'Productos Domésticos',
  pe: 'Productos PE',
  vinilo: 'Productos Vinilo',
  'natural-latex': 'Productos Natural Latex',
};

export default function ProductPage() {
  const { id } = useParams();
  const product = allProducts.find(p => String(p.id) === String(id));

  if (!product) return <div className={styles.notFound}>Producto no encontrado</div>;

  // Use product's category for title and badges
  const category = product.category || 'nitrilo';
  const categoryTitle = categoryTitles[category] || 'Productos';

  // Badge config per category
  const badgeConfig = {
    nitrilo: [
      { text: 'NITRILO', className: styles.badgeNitrilo },
      { text: 'Latex Free', className: styles.badgeLatexFree },
    ],
    esteriles: [
      { text: 'ESTÉRIL', className: styles.badgeEsteril },
    ],
    domesticos: [
      { text: 'DOMÉSTICOS', className: styles.badgeDomesticos },
    ],
    pe: [
      { text: 'PE', className: styles.badgePE },
    ],
    vinilo: [
      { text: 'VINILO', className: styles.badgeVinilo },
    ],
    'natural-latex': [
      { text: 'NATURAL LATEX', className: styles.badgeNaturalLatex },
    ],
  };
  const badges = badgeConfig[category] || [];

  return (
    <div className={styles.pageContainer}>
      <TitleProducts title={categoryTitle} />
      <div className={styles.productBox}>
        <div className={styles.leftCol}>
          <ImageGallery images={product.images || [product.image]} />
        </div>
        <div className={styles.rightCol}>
          <div className={styles.badges}>
            {badges.map(b => (
              <span key={b.text} className={b.className}>{b.text}</span>
            ))}
          </div>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.price}>${product.price?.toLocaleString('es-AR') || '-'}</div>
          <div className={styles.priceNote}>Consulte cotización mayorista o instituciones</div>
          <div className={styles.sizesLabel}>Talles</div>
          <div className={styles.sizesRow}>
            {product.sizes?.map(size => (
              <span key={size} className={styles.sizeBox}>{size}</span>
            ))}
          </div>
          <div className={styles.productInfo}>
            <div><b>Cod.</b> 08011-al-08015</div>
            <div>Según talle</div>
            <div>Precio IVA incluido</div>
            <div>PM-1015-25</div>
          </div>
          <div className={styles.descLabel}>Descripción:</div>
          <div className={styles.descText}>{product.description}</div>
          <div className={styles.actionsRow}>
            <button className={styles.buyBtn}>Comprar ahora</button>
            <button className={styles.consultBtn}>Consultar</button>
          </div>
        </div>
      </div>
      <h2 className={styles.sectionTitle}>Categorías de productos</h2>
      <ProductCards />
      <InfoCardsMagicBento />
      <DownloadCatalog />
    </div>
  );
}
