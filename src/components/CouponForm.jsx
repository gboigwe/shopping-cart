import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CouponForm.css';

const CouponForm = () => {
  const { 
    applyCoupon, 
    removeCoupon, 
    couponCode, 
    couponError, 
    couponSuccess 
  } = useCart();
  
  const [inputCode, setInputCode] = useState(couponCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    applyCoupon(inputCode.trim());
  };

  return (
    <div className="coupon-container">
      <h3>Have a coupon?</h3>
      
      {couponSuccess ? (
        <div className="applied-coupon">
          <p className="success-message">{couponSuccess}</p>
          <div className="coupon-tag">
            <span>{couponCode}</span>
            <button 
              onClick={() => {
                removeCoupon();
                setInputCode('');
              }}
              className="remove-coupon-btn"
            >
              &times;
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="coupon-form">
          <div className="input-group">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter coupon code"
              className="coupon-input"
            />
            <button type="submit" className="apply-coupon-btn">
              Apply
            </button>
          </div>
          
          {couponError && (
            <p className="error-message">{couponError}</p>
          )}
          
          <p className="coupon-hint">
            Try code: <strong>WEB3BRIDGECHECKOUT</strong> for 10% off
          </p>
        </form>
      )}
    </div>
  );
};

export default CouponForm;
