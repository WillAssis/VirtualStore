import { Product } from '../../types';
import ProductCard from '../../components/Cards/ProductCard';
import styles from './ProductList.module.scss';

interface Props {
  products: Product[];
  searchTerm: string | null;
}

function ProductList({ products, searchTerm }: Props) {
  return (
    <div className={styles.contentWrapper}>
      {searchTerm && (
        <p className={styles.paragraph}>Resultados para "{searchTerm}"</p>
      )}
      <ul className={styles.list} aria-label="Produtos">
        {products.map((product) => (
          <li key={product._id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
