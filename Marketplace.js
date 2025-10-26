import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listProducts } from '../graphql/queries';
// Don't need createProduct here for now, can be in a separate "add item" 
page
import ProductCard from '../components/ProductCard'; // Import the new 
component
import './MarketplacePage.css'; // We will create this CSS file

const client = generateClient();

const MarketplacePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const apiData = await client.graphql({ query: listProducts });
      const productsFromAPI = apiData.data.listProducts.items;
      setProducts(productsFromAPI);
    } catch (err) {
      console.error('error fetching products:', err);
    }
    setLoading(false);
  }

  return (
    <div className="marketplace-page">
      <div className="marketplace-header">
        <h1>Marketplace</h1>
        {/* Add search and cart icons here later */}
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {/* The floating '+' button can be added here */}
    </div>
  );
};

export default MarketplacePage;
