import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Admin from '../pages/Admin/Admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'produtos', element: <Products /> },
      { path: 'produtos/:slug', element: <ProductDetails /> },
      { path: 'carrinho', element: <Cart /> },
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <Register /> },
      { path: 'admin/*', element: <Admin /> },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
