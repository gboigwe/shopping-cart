import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const VALID_COUPON = "WEB3BRIDGECHECKOUT";
const DISCOUNT_PERCENTAGE = 10;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [subtotal, setSubtotal] = useState(0);
  const [couponCode, setCouponCode] = useState(() => {
    return localStorage.getItem('couponCode') || '';
  });
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('couponCode', couponCode);
    
    const newSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);
    
    if (couponCode === VALID_COUPON) {
      const discount = (newSubtotal * DISCOUNT_PERCENTAGE) / 100;
      setDiscountAmount(discount);
      setTotal(newSubtotal - discount);
      
      if (!couponSuccess) {
        setCouponSuccess(`${DISCOUNT_PERCENTAGE}% discount applied!`);
      }
    } else {
      setDiscountAmount(0);
      setTotal(newSubtotal);
      setCouponSuccess('');
    }
  }, [cart, couponCode]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0 || !Number.isInteger(newQuantity)) {
      return false;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
    
    return true;
  };

  const removeItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code) => {
    setCouponError('');
    setCouponSuccess('');
    
    if (!code.match(/^[a-zA-Z0-9]+$/)) {
      setCouponError('Invalid coupon format. Please use letters and numbers only.');
      return false;
    }
    
    if (code === VALID_COUPON) {
      setCouponCode(code);
      setCouponSuccess(`${DISCOUNT_PERCENTAGE}% discount applied!`);
      return true;
    } else {
      setCouponError('Invalid coupon code.');
      setCouponCode('');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError('');
    setCouponSuccess('');
  };

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discountAmount,
    total,
    itemCount,
    isCartOpen,
    toggleCart,
    setIsCartOpen,
    couponCode,
    applyCoupon,
    removeCoupon,
    couponError,
    couponSuccess
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
