import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HTTPProductsResponse } from '../../types';
import { Product } from '../../types';
import useFetch from '../../hooks/useFetch';
import Pagination from '../../components/Pagination/Pagination';
import Title from './Title';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductList from './ProductList';
import Loading from '../../components/Loading/Loading';
import './Products.css';

const DATA_URL = 'http://localhost:3333/produtos';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchURL, setSearchURL] = useState<string>(DATA_URL);
  const { data, loading, error } = useFetch<HTTPProductsResponse>(searchURL);

  const products: Product[] = data?.products || [];
  const totalPages: number = data?.pages || 1;
  const currentPage: number = data?.currentPage || 1;

  useEffect(() => {
    const searchString = searchParams.toString();
    const newURL = searchString ? `${DATA_URL}?${searchString}` : DATA_URL;
    setSearchURL(newURL);
  }, [searchParams]);

  const jumpToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      if (page === 1) {
        searchParams.delete('page');
      } else {
        searchParams.set('page', page.toString());
      }
      setSearchParams(searchParams);
    }
  };

  const previousPage = () => {
    if (currentPage > 1 && currentPage <= totalPages) {
      if (currentPage === 2) {
        searchParams.delete('page');
      } else {
        searchParams.set('page', (currentPage - 1).toString());
      }
      setSearchParams(searchParams);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      searchParams.set('page', (currentPage + 1).toString());
      setSearchParams(searchParams);
    }
  };

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

  return (
    <main className="product-page">
      {loading ? (
        <Loading error={error} />
      ) : (
        <>
          <Title />
          <SearchBar search={handleSearch} />
          <ProductList
            products={products}
            searchTerm={searchParams.get('search')}
          />
          <Pagination
            currentPage={currentPage}
            pages={totalPages}
            jumpToPage={jumpToPage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </>
      )}
    </main>
  );
}

export default Products;
