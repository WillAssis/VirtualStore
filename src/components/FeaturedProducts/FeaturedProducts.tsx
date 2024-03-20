import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { HTTPProductsResponse } from '../../types';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading/Loading';
import ProductCard from '../Cards/ProductCard';
import './FeaturedProducts.css';

interface Params {
  title: string;
  link?: string;
}

const DATA_URL = 'http://localhost:3333/destaques';

function FeaturedProducts({ title, link }: Params) {
  const { data, loading, error } = useFetch<HTTPProductsResponse>(DATA_URL);

  const products: Product[] = data?.products.slice(0, 4) || [];

  return (
    <section aria-labelledby="featured-products" className="featured-products">
      {loading ? (
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
