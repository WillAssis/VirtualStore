import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HTTPProductsResponse } from '../../types';
import { Product } from '../../types';
import useFetch from '../../hooks/useFetch';
import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import Pagination from '../../components/Pagination/Pagination';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loading from '../../components/Loading/Loading';
import ProductList from './ProductList';
import NoResult from './NoResult';
import styles from './Products.module.scss';

const DATA_URL = 'http://localhost:3333/produtos';

const icon = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z" />
  </svg>
);

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
    if (page === 1) {
      searchParams.delete('page');
    } else if (page <= totalPages) {
      searchParams.set('page', page.toString());
    }
    setSearchParams(searchParams);
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
    <main className={styles.main}>
      <Loading loading={loading} error={error}>
        <Container>
          <div className={styles.contentWrapper}>
            <Title icon={icon} text="Mostrando produtos" />
            <SearchBar search={handleSearch} />
            {products.length > 0 ? (
              <>
                <ProductList
                  products={products}
                  searchTerm={searchParams.get('search')}
                />
                <Pagination
                  currentPage={currentPage}
                  pages={totalPages}
                  jump={jumpToPage}
                />
              </>
            ) : (
              <NoResult />
            )}
          </div>
        </Container>
      </Loading>
    </main>
  );
}

export default Products;
