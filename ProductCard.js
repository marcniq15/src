import React from 'react';
import './ProductCard.css'; // We will create this CSS file

// We receive product data as 'props'
const ProductCard = ({ product }) => {
  // Use a placeholder if there's no image
  const imageUrl = product.imageKey ? 
`https://your-s3-bucket-url/${product.imageKey}` : 
'https://via.placeholder.com/300';

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={imageUrl} alt={product.name} className="product-image" 
/>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-seller">Posted by {product.ownerId || 
'Seller'}</p>
        <p className="product-price">RM 
{parseFloat(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
