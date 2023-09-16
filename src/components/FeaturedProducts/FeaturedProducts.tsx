import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import ProductCard from '../Cards/ProductCard';
import { Product } from '../../types';
import './FeaturedProducts.css';

function FeaturedProducts() {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedFetchChecker, setFailedFetchChecker] = useState(false);

  // Em caso de falha, a requisição é feita novamente após 10 segundos
  useEffect(() => {
    fetch('http://localhost:3333/destaques')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products.slice(0, 4));
        // Tempo mínimo de 0.5s para carregar
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);

        setTimeout(() => {
          setFailedFetchChecker(!failedFetchChecker);
        }, 10000);

        if (failedFetchChecker) {
          setError('Erro: verifique sua conexão');
        }
      });
  }, [failedFetchChecker]);

  return (
    <section aria-label="Produtos em destaque" className="featured-products">
      {isLoading ? (
        <Loading error={error} />
      ) : (
        <>
          <h2>Produtos em Destaque</h2>
          <ul className="products-container">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default FeaturedProducts;
