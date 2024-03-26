import { Product } from '../../types';
import { HTTPProductsResponse } from '../../types';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading/Loading';
import ProductCard from '../Cards/ProductCard';
import styles from './FeaturedProducts.module.scss';

const DATA_URL = 'http://localhost:3333/destaques';

function FeaturedProducts() {
  const { data, loading, error } = useFetch<HTTPProductsResponse>(DATA_URL);

  const products: Product[] = data?.products.slice(0, 4) || [];

  return (
    <Loading loading={loading} error={error}>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Loading>
  );
}

export default FeaturedProducts;
