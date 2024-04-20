import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, HTTPProductsResponse } from '../../types';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';
import Title from '../../components/Title/Title';
import Button from '../../components/Buttons/Button';
import SearchBar from '../../components/SearchBar/SearchBar';
import AdminProductCard from '../../components/AdminProductCard/AdminProductCard';
import Pagination from '../../components/Pagination/Pagination';
import styles from './AdminProductList.module.scss';

const DATA_URL = 'http://localhost:3333/produtos';
const DELETE_URL = 'http://localhost:3333/produto';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2,10.96C1.5,10.68 1.35,10.07 1.63,9.59L3.13,7C3.24,6.8 3.41,6.66 3.6,6.58L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.66,6.72 20.82,6.88 20.91,7.08L22.36,9.6C22.64,10.08 22.47,10.69 22,10.96L21,11.54V16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V10.96C2.7,11.13 2.32,11.14 2,10.96M12,4.15V4.15L12,10.85V10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V12.69L14,15.59C13.67,15.77 13.3,15.76 13,15.6V19.29L19,15.91M13.85,13.36L20.13,9.73L19.55,8.72L13.27,12.35L13.85,13.36Z" />
  </svg>
);

function AdminProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchURL, setSearchURL] = useState<string>(DATA_URL);
  const { data, loading, error } = useFetch<HTTPProductsResponse>(searchURL);

  const products: Product[] = data?.products || [];
  const searchTerm = searchParams.get('search');
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

  const deleteProduct = async (id: string) => {
    const url = `${DELETE_URL}/${id}`;
    const response = await fetch(url, {
      credentials: 'include',
      method: 'DELETE',
    });

    // Volta para a página 1 sem search
    if (response.ok) {
      searchParams.delete('search');
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  };

  return (
    <Loading loading={loading} error={error}>
      <Container>
        <div className={styles.contentWrapper}>
          <Title text="Listando produtos" icon={icon} />
          <div className={styles.controls}>
            <SearchBar search={handleSearch} />
            <Button path="/admin/produtos/editor">Novo</Button>
          </div>
          {searchTerm && (
            <p className={styles.paragraph}>Resultados para "{searchTerm}"</p>
          )}
          {products.length > 0 ? (
            <>
              <ul className={styles.list} aria-label="Lista de produtos">
                {products.map((product) => (
                  <li key={product._id}>
                    <AdminProductCard
                      product={product}
                      deleteProduct={deleteProduct}
                    />
                  </li>
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                pages={totalPages}
                jump={jumpToPage}
              />
            </>
          ) : (
            <p className={styles.noResult}>Sem resultados</p>
          )}
        </div>
      </Container>
    </Loading>
  );
}

export default AdminProductList;
