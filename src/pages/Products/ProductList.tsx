import ProductCard from '../../components/Cards/ProductCard';
import { Product } from '../../types';
import './ProductList.css';

interface Props {
  products: Product[];
  searchTerm?: string | null;
}

function ProductList({ products, searchTerm }: Props) {
  return (
    <section className="products-container" aria-label="Produtos">
      {products.length > 0 ? (
        <>
          {searchTerm ? <p>Resultados para "{searchTerm}"</p> : null}
          <ul aria-label="Lista dos produtos" className="product-list">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Nenhum produto encontrado</p>
      )}
    </section>
  );
}

export default ProductList;
