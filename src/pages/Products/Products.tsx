import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Pagination from '../../components/Pagination/Pagination';
import SearchBar from './subcomponents/SearchBar';
import ProductList from './subcomponents/ProductList';
import { Product } from '../../types';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3333/produtos?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setPages(data.pages);
      })
      .catch((error) => {
        console.log('Ocorreu um erro ao obter os produtos:', error);
      });
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        (product.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredProducts(filteredProducts);
    }
  }, [products, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = document.getElementById('search') as HTMLInputElement;
    setSearchTerm(input.value);
    input.value = '';
  };

  useEffect(() => {
    if (filteredProducts.length === 0 && searchTerm !== '') {
      setError(`Nenhum produto encontrado com o nome ${searchTerm}`);
    } else {
      setError('');
    }
  }, [filteredProducts, searchTerm]);

  return (
    <main className="product-page">
      <h3
        style={{ backgroundColor: '#D9D9D9' }}
        className="mt-3 mb-3 text-center p-2"
      >
        Mostrando Produtos
      </h3>
      <Container>
        <SearchBar search={handleSearch} />
        <ProductList products={products} />
        <Pagination
          currentPage={currentPage}
          pages={pages}
          onPageChange={handlePageChange}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
        />
      </Container>
    </main>
  );
}

export default Products;
