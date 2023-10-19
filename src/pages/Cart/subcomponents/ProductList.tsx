import CartProductCard from '../../../components/Cards/CartProductCard';
import { CartItem } from '../../../types';
import './ProductList.css';

interface Params {
  products: CartItem[];
  updateQuantity: (itemId: number, newQuantity: number) => void;
  deleteProduct: (itemId: number) => void;
}

function ProductList({ products, updateQuantity, deleteProduct }: Params) {
  return (
    <section className="cart-items" aria-label="Produtos">
      <ul className="cart-items-list">
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
    </section>
  );
}

export default ProductList;
