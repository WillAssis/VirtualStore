import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="produtos" element={<Products />} />
    </Routes>
  );
}

export default App;
