import ProductCard from '../../../components/Cards/ProductCard';
import { Product } from '../../../types';
import './ProductList.css';

interface Params {
  products: Product[];
}

function ProductList({ products }: Params) {
  return (
    <ul aria-label="Lista dos produtos" className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
