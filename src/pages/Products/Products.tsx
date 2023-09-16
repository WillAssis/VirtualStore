import { useState, useEffect } from 'react';
import generateSearchURL from '../../utils/generateSearchURL';
import Pagination from '../../components/Pagination/Pagination';
import Title from './subcomponents/Title';
import SearchBar from './subcomponents/SearchBar';
import ProductList from './subcomponents/ProductList';
import Loading from '../../components/Loading/Loading';
import { Product } from '../../types';
import './Products.css';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failedFetchChecker, setFailedFetchChecker] = useState(false);
  const [error, setError] = useState('');

  // Em caso de falha, a requisição é feita novamente após 10 segundos
  useEffect(() => {
    const url = generateSearchURL(currentPage, searchTerm);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setPages(data.pages);
        // Tempo mínimo de 0.5s para carregar a página
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.log('Ocorreu um erro ao obter os produtos:', error);

        setTimeout(() => {
          setFailedFetchChecker(!failedFetchChecker);
        }, 10000);

        if (failedFetchChecker) {
          setError(
            'Não foi possível carregar os produtos, verifique sua conexão'
          );
        }
      });
  }, [currentPage, searchTerm, failedFetchChecker]);

  const jumpToPage = (page: number) => {
    if (page !== currentPage) {
      setIsLoading(true);
      setCurrentPage(page);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setIsLoading(true);
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < pages) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const input = document.getElementById('search') as HTMLInputElement;
    setSearchTerm(input.value);
    input.value = '';
  };

  return (
    <main className="product-page">
      {isLoading ? (
        <Loading error={error} />
      ) : (
        <>
          <Title />
          <SearchBar search={handleSearch} />
          <ProductList products={products} searchTerm={searchTerm} />
          <Pagination
            currentPage={currentPage}
            pages={pages}
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
