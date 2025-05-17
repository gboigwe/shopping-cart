import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CouponForm from './CouponForm';
import '../styles/CartSummary.css';

const CartSummary = () => {
  const { 
    subtotal, 
    discountAmount, 
    total,
    itemCount,
    toggleCart
  } = useCart();

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      
      <div className="summary-row">
        <span>Items ({itemCount}):</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      {discountAmount > 0 && (
        <div className="summary-row discount">
          <span>Discount:</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
      )}
      
      <CouponForm />
      
      <div className="summary-row total">
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
  );
};

export default CartSummary;
