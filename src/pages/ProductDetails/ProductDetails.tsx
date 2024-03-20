import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import useFetch from '../../hooks/useFetch';
import Title from './subcomponents/Title';
import ImageSlider from './subcomponents/ImageSlider';
import QuantityInput from '../../components/QuantityInput/QuantityInput';
import Loading from '../../components/Loading/Loading';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import updateProductToCart from '../../utils/updateProductToCart';
import './ProductDetails.css';

const DATA_URL = 'http://localhost:3333/produto';

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useFetch<Product>(`${DATA_URL}/${slug}`);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (data) {
      updateProductToCart(data, selectedQuantity);
      navigate('/carrinho');
    }
  };

  return (
    <main aria-label="Carregando produto">
      {loading || !data ? (
        <Loading error={error} />
      ) : (
        <>
          <main className="product-details-page">
            <Title />
            <section className="product-details" aria-labelledby="product-name">
              <ImageSlider images={data.images} />
              <div className="product-informations">
                <h3 id="product-name">{data.name}</h3>
                <p>{data.description}</p>
                <p>Preço: R$ {data.price.toFixed(2)}</p>
                <label htmlFor="quantity">
                  Quantidade:
                  <QuantityInput
                    quantity={selectedQuantity}
                    setQuantity={setSelectedQuantity}
                  />
                </label>
                <p>
                  Valor total:{' '}
                  <span className="accent-text">
                    R$ {(data.price * selectedQuantity).toFixed(2)}
                  </span>
                </p>
                <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
              </div>
            </section>
          </main>
          <FeaturedProducts title="Mais produtos" />
        </>
      )}
    </main>
  );
}

export default ProductDetails;
