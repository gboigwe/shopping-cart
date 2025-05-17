import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
// import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/CartSidebar';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
        <CartSidebar />
      </Router>
    </CartProvider>
  );
}

export default App;
