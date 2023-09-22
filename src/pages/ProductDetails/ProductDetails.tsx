import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from './subcomponents/Title';
import ImageSlider from './subcomponents/ImageSlider';
import QuantityInput from '../../components/QuantityInput/QuantityInput';
import Loading from '../../components/Loading/Loading';
import updateProductToCart from '../../utils/updateProductToCart';
import { Product } from '../../types';
import './ProductDetails.css';

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [failedFetchChecker, setFailedFetchChecker] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Em caso de falha, a requisição é feita novamente após 10 segundos
  useEffect(() => {
    fetch(`http://localhost:3333/produto/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        // Tempo mínimo de 0.25s para carregar a página
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      })
      .catch((error) => {
        console.error('Erro ao obter o produto:', error);

        setTimeout(() => {
          setFailedFetchChecker(!failedFetchChecker);
        }, 10000);

        if (failedFetchChecker) {
          setError(
            'Não foi possível carregar o produto, verifique sua conexão'
          );
        }
      });
  }, [failedFetchChecker, slug]);

  const handleAddToCart = () => {
    if (product) {
      updateProductToCart(product, selectedQuantity);
      navigate('/cart');
    }
  };

  return (
    <main className="product-details-page">
      {isLoading || !product ? (
        <Loading error={error} />
      ) : (
        <>
          <Title />
          <section className="product-details" aria-labelledby="product-name">
            <ImageSlider images={product.images} />
            <div>
              <h3 id="product-name">{product.name}</h3>
              <p>{product.description}</p>
              <p>Preço: R$ {product.price.toFixed(2)}</p>
              <label htmlFor="quantity">
                Quantidade:
                <QuantityInput
                  quantity={selectedQuantity}
                  changeQuantity={setSelectedQuantity}
                />
              </label>
              <p>
                Valor total:{' '}
                <span className="accent-text">
                  R$ {(product.price * selectedQuantity).toFixed(2)}
                </span>
              </p>
              <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default ProductDetails;
