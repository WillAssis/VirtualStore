import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from './types';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart';
import loadPageTheme from './utils/loadPageTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

loadPageTheme();

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // O catch é temporário até a funcionalidade ser implementada no backend
    fetch('http://localhost:3333/profile', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser({ username: 'Temp_user', isAdmin: true }));
  }, []);

  return (
    <>
      <Header
        user={user}
        logout={() => {
          setUser(null);
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/produtos/:slug" element={<ProductDetails />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/cadastro" element={<Register setUser={setUser} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
