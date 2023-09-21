import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from './subcomponents/Title';
import ImageSlider from './subcomponents/ImageSlider';
import QuantityInput from '../../components/QuantityInput/QuantityInput';
import updateProductToCart from '../../utils/updateProductToCart';
import { Product } from '../../types';
import './ProductDetails.css';

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3333/produto/${slug}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      updateProductToCart(product, selectedQuantity);
      navigate('/cart');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="product-details-page">
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
    </main>
  );
}

export default ProductDetails;
