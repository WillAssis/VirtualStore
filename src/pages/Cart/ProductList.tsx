import { CartItem } from '../../types';
import CartProductCard from '../../components/Cards/CartProductCard';
import styles from './ProductList.module.scss';

interface Params {
  products: CartItem[];
  updateQuantity: (id: number, newQuantity: number) => void;
  deleteProduct: (id: number) => void;
}

function ProductList({ products, updateQuantity, deleteProduct }: Params) {
  return (
    <ul className={styles.list} aria-label="Produtos">
      {products.map((product) => (
        <li key={product.id}>
          <CartProductCard
            product={product}
            outerUpdateQuantity={updateQuantity}
            deleteProduct={deleteProduct}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
