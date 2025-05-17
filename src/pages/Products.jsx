import React from 'react';
import ProductCard from '../components/ProductCard';
import CartButton from '../components/CartButton';
import products from '../utils/productData';
import { useCart } from '../context/CartContext';
import '../styles/Products.css';

const Products = () => {
  const { addToCart } = useCart();
  
  return (
    <div className="products-container">
      <header className="header">
        <h1>Tech Store</h1>
        <CartButton />
      </header>
      
      <main>
        <h2>Our Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
