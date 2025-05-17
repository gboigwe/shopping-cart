import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/StorageWarning.css';

const StorageWarning = () => {
  const { storageAvailable } = useCart();
  
  if (storageAvailable) {
    return null;
  }
  
  return (
    <div className="storage-warning">
      <div className="warning-content">
        <span className="warning-icon">⚠️</span>
        <p>
          Your browser has localStorage disabled or in private browsing mode.
          Your cart items will not be saved between sessions.
        </p>
      </div>
    </div>
  );
};

export default StorageWarning;
