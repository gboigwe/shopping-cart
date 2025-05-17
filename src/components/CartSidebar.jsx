import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartSidebar.css';

const CartSidebar = () => {
  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    removeItem, 
    updateQuantity, 
    total, 
    itemCount 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-sidebar-container">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Your Cart ({itemCount} items)</h2>
          <button 
            className="close-cart-btn"
            onClick={toggleCart}
          >
            &times;
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={toggleCart} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) {
                            updateQuantity(item.id, val);
                          }
                        }}
                        className="quantity-input"
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    
                    <p className="item-total">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-item-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="cart-actions">
                <button onClick={toggleCart} className="continue-shopping-btn">
                  Continue Shopping
                </button>
                <Link to="/checkout" className="checkout-btn">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="cart-overlay" onClick={toggleCart}></div>
    </div>
  );
};

export default CartSidebar;
