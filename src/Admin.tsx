import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { authContext } from './contexts/authContext';
import AdminHeader from './components/AdminHeader/AdminHeader';

function Admin() {
  const { user } = useContext(authContext);

  if (!user || !user.isAdmin) {
    throw new Response('Not found'); // Redireciona para ErrorElement
  }

  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
}

export default Admin;
