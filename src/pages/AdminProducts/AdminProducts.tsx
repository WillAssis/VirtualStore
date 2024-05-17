import { Outlet } from 'react-router-dom';
import styles from './AdminProducts.module.scss';

// Agrega os elementos: AdminProductList e AdminProductEditor nas routes
function AdminProducts() {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
}

export default AdminProducts;
