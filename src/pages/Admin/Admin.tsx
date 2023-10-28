import { Routes, Route } from 'react-router-dom';
import Navigation from './subcomponents/Navigation';
import AdminHome from './subcomponents/AdminHome';
import AdminProducts from './subcomponents/AdminProducts';
import ProductForm from './subcomponents/ProductForm';
import './Admin.css';

function Admin() {
  return (
    <div className="admin-page">
      <Navigation />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/produtos" element={<AdminProducts />} />
        <Route path="/produtos/:slug" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default Admin;
