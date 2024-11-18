import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { CartProvider } from './context/cartcontext';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import ProductPage from './pages/productPage';
import CartPage from './pages/cartPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Checkout from './pages/checkoutPage';
import OrdersPage from './pages/OrderPage';
import MyProductsPage from './pages/MyproductPage';
import ProfilePage from './pages/profilePage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrdersPage />} />
           <Route path="/my-products" element={<MyProductsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
