import { useContext } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import Navigation from './subcomponents/Navigation';
import AdminHome from './subcomponents/AdminHome';
import AdminProducts from './subcomponents/AdminProducts';
import ProductForm from './subcomponents/ProductForm';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const { user } = useContext(authContext);

  if (!user || !user.isAdmin) {
    navigate('/');
  }

  return (
    <div className="admin-page">
      <Navigation />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/produtos" element={<AdminProducts />} />
        <Route path="/produtos/criar" element={<ProductForm />} />
        <Route path="/produtos/editar/:slug" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default Admin;
