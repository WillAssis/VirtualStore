import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import ProductCard from '../Cards/ProductCard';
import { Product } from '../../types';
import './FeaturedProducts.css';
import { Link } from 'react-router-dom';

interface Params {
  title: string;
  link?: string;
}

function FeaturedProducts({ title, link }: Params) {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedFetchChecker, setFailedFetchChecker] = useState(false);

  // Em caso de falha, a requisição é feita novamente após 10 segundos
  useEffect(() => {
    fetch('http://localhost:3333/destaques')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products?.slice(0, 4) || []);
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
    <section aria-labelledby="featured-products" className="featured-products">
      {isLoading ? (
        <Loading error={error} />
      ) : (
        <>
          <h2 id="featured-products">{title}</h2>
          <ul className="products-container">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          {link ? <Link to={link}>Ver mais</Link> : null}
        </>
      )}
    </section>
  );
}

export default FeaturedProducts;
