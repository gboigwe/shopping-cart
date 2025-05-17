import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../utils/productData';
import '../styles/Products.css';

const Products = () => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    alert(`${product.name} added to cart!`);
  };
  
  return (
    <div className="products-container">
      <header className="header">
        <h1>Tech Store</h1>
        <div className="cart-icon">
          <Link to="/checkout">
            <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            🛒
          </Link>
        </div>
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
