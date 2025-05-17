import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartButton.css';

const CartButton = () => {
  const { toggleCart, itemCount } = useCart();

  return (
    <button 
      className="cart-button" 
      onClick={toggleCart}
      aria-label="Open Shopping Cart"
    >
      <div className="cart-icon">
        🛒
        {itemCount > 0 && (
          <span className="cart-count">{itemCount}</span>
        )}
      </div>
    </button>
  );
};

export default CartButton;
