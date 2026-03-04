import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TitleProducts from '../components/TitleProducts/TitleProducts';
import InfoCardsMagicBento from '../components/InfoCardsMagicBento/InfoCardsMagicBento';
import ProductCards from '../components/ProductCards/ProductCards';
import DownloadCatalog from '../components/DownloadCatalog/DownloadCatalog';
import styles from './CategoryPage.module.css';

// Simulated product data for all categories
import nitriloProducts from '../data/products-nitrilo.json';
import { Tube } from 'ogl';
import { processProductImages } from '../utils/imageHelper';

const processedProducts = processProductImages(nitriloProducts);

const allProducts = {
  nitrilo: processedProducts.slice(0, 6),
  esteriles: processedProducts.slice(0, 4),
  domesticos: processedProducts.slice(0, 5),
  pe: processedProducts.slice(0, 3),
  vinilo: processedProducts.slice(0, 4),
  'natural-latex': processedProducts.slice(0, 5),
};

const categoryTitles = {
  nitrilo: 'Nitrilo',
  esteriles: 'Estériles',
  domesticos: 'Domésticos',
  pe: 'PE',
  vinilo: 'Vinilo',
  'natural-latex': 'Natural Latex',
};

// Get all products by category dynamically
function getProductsByCategory(products, category) {
  return products.filter(p => p.category === category);
}

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const products = getProductsByCategory(processedProducts, category);
  const title = categoryTitles[category] || 'Productos';

  const handleProductClick = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/producto/${id}`);
  };
  return (
    <div className={styles.pageContainer}>
      <TitleProducts title={title} />
      <div className={styles.productsGrid}>
        {products.map((product, idx) => (
          <div
            key={product.id}
            className={styles.productCard + ' ' + styles.fadeIn}
            style={{ animationDelay: `${idx * 0.08}s`, cursor: 'pointer' }}
            onClick={() => handleProductClick(product.id)}
          >
            <div className={styles.productTitle}>{product.title}</div>
            <img src={product.image} alt={product.title} className={styles.productImgLarge} />
          </div>
        ))}
      </div>
      <h2 className={styles.sectionTitle}>Categorías de productos</h2>
      <ProductCards />
      <InfoCardsMagicBento />
      <DownloadCatalog />
    </div>
  );
}
