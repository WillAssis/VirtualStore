import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from './types';
import { AuthProvider } from './contexts/authContext';
import { ThemeProvider } from './contexts/themeContext';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Admin from './pages/Admin/Admin';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/Cart';
import loadPageTheme from './utils/loadPageTheme';
import Order from './pages/Order/Order';
import './App.scss';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const auth = () => {
    fetch('http://localhost:3333/profile', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  };

  const logout = () => {
    fetch('http://localhost:3333/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUser(null);
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Header user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:slug" element={<ProductDetails />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/cadastro" element={<Register setUser={setUser} />} />
          <Route path="/pedido" element={<Order />} />
          <Route path="/admin/*" element={<Admin user={user} />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
