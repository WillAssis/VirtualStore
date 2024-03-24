import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Product, HTTPProductsResponse } from '../../../types';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/Loading/Loading';
import SearchBar from '../../../components/SearchBar/SearchBar';
import AdminProductCard from '../../../components/Cards/AdminProductCard';
import './AdminProducts.css';

const DATA_URL = 'http://localhost:3333/produtos';

function AdminProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchURL, setSearchURL] = useState<string>(DATA_URL);
  const { data, loading, error } = useFetch<HTTPProductsResponse>(searchURL);

  const products: Product[] = data?.products || [];
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    const searchString = searchParams.toString();
    const newURL = searchString ? `${DATA_URL}?${searchString}` : DATA_URL;
    setSearchURL(newURL);
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchString = formData.get('search')?.toString();
    if (searchString) {
      searchParams.set('search', searchString);
    } else {
      searchParams.delete('search');
    }
    searchParams.delete('page');
    setSearchParams(searchParams);
    event.currentTarget.value = '';
  };

  const deleteProduct = async (slug: string) => {
    const url = `${DATA_URL}/${slug}`;
    await fetch(url, {
      credentials: 'include',
      method: 'DELETE',
    });
  };

  return (
    <main className="admin-products">
      <Loading loading={loading} error={error}>
        <div className="product-list-wrapper">
          <h2>Listando Produtos</h2>
          <div className="product-list-controls">
            <SearchBar search={handleSearch} />
            <Link to="/admin/produtos/criar">Novo</Link>
          </div>
          {searchTerm && <p>Resultados para "{searchTerm}"</p>}
          {products.length > 0 ? (
            <ul className="product-list" aria-label="Lista de produtos">
              {products.map((product) => (
                <li key={product.id}>
                  <AdminProductCard
                    product={product}
                    deleteProduct={deleteProduct}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem resultados</p>
          )}
        </div>
      </Loading>
    </main>
  );
}

export default AdminProducts;
