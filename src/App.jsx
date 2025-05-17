import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
// import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        {/* <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
