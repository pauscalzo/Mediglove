/**
 * Get the correct image path relative to the app's PUBLIC_URL
 * @param {string} imagePath - The image path (e.g. 'logo.png' or 'img/logo.png')
 * @returns {string} The complete image URL
 */
export const getImageUrl = (imagePath) => {
  const base = process.env.PUBLIC_URL || '/';
  // Remove leading ./
  const cleanPath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;
  // Remove leading / from imagePath if it exists
  const finalPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
  
  return `${base}${base.endsWith('/') ? '' : '/'}${finalPath}`;
};

/**
 * Process products array to wrap image paths with getImageUrl
 * @param {Array} products - Array of product objects
 * @returns {Array} Products with transformed image paths
 */
export const processProductImages = (products) => {
  if (!products) return [];
  return products.map(product => ({
    ...product,
    image: product.image ? getImageUrl(product.image) : product.image,
    images: product.images ? product.images.map(img => getImageUrl(img)) : product.images,
  }));
};
