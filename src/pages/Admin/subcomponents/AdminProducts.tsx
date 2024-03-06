import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import SearchBar from '../../../components/SearchBar/SearchBar';
import AdminProductCard from '../../../components/Cards/AdminProductCard';
import { Product } from '../../../types';
import './AdminProducts.css';

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rerunFetchChecker, setRerunFetchChecker] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParam = searchTerm
      ? '?search='.concat(searchTerm.toLowerCase())
      : '';
    const url = `http://localhost:3333/produtos${searchParam}`;

    fetch(url, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        // Tempo mínimo de 0.5s para carregar a página
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.log('Ocorreu um erro ao obter os produtos:', error);

        setTimeout(() => {
          setRerunFetchChecker(!rerunFetchChecker);
          setError(
            'Não foi possível carregar os produtos, verifique sua conexão',
          );
        }, 10000);
      });
  }, [searchTerm, rerunFetchChecker]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const input = document.getElementById('search') as HTMLInputElement;
    setSearchTerm(input.value);
    input.value = '';
  };

  const deleteProduct = async (slug: string) => {
    setIsLoading(true);

    const url = `http://localhost:3333/produto/${slug}`;
    const response = await fetch(url, {
      credentials: 'include',
      method: 'DELETE',
    });

    if (response.ok) {
      setRerunFetchChecker(!rerunFetchChecker); // Recarrega a lista
    } else {
      setError(`Não foi possível deletar o produto: ${response.statusText}`);
    }
  };

  return (
    <main className="admin-products">
      {isLoading ? (
        <Loading error={error} />
      ) : (
        <div className="product-list-wrapper">
          <h2>Listando Produtos</h2>
          <div className="product-list-controls">
            <SearchBar search={handleSearch} />
            <Link to="/admin/produtos/criar">Novo</Link>
          </div>
          {searchTerm ? <p>Resultados para "{searchTerm}"</p> : null}
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
      )}
    </main>
  );
}

export default AdminProducts;
