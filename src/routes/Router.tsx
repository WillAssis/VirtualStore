import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import App from '../App';
import Admin from '../Admin';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import FinishOrder from '../pages/FinishOrder/FinishOrder';
import Orders from '../pages/Orders/Orders';
import AdminHome from '../pages/AdminHome/AdminHome';
import AdminProducts from '../pages/AdminProducts/AdminProducts';
import AdminProductList from '../pages/AdminProductList/AdminProductList';
import AdminProductEditor from '../pages/AdminProductEditor/AdminProductEditor';
import AdminOrders from '../pages/AdminOrders/AdminOrders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'produtos', element: <Products /> },
      { path: 'produtos/:id', element: <ProductDetails /> },
      { path: 'carrinho', element: <Cart /> },
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <Register /> },
      { path: 'pedido', element: <FinishOrder /> },
      { path: 'pedidos', element: <Orders /> },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AdminHome /> },
      {
        path: 'produtos',
        element: <AdminProducts />,
        children: [
          { index: true, element: <AdminProductList /> },
          { path: 'editor', element: <AdminProductEditor /> },
          { path: 'editor/:id', element: <AdminProductEditor /> },
        ],
      },
      { path: 'pedidos', element: <AdminOrders /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
