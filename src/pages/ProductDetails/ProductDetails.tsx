import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Title from './subcomponents/Title';
import ImageSlider from './subcomponents/ImageSlider';
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

  const increaseQuantity = () => {
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = (redirectToCart = true) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(
      (item: Product) => item.slug === product?.slug
    );

    if (existingItem) {
      existingItem.quantity += selectedQuantity;
    } else {
      cartItems.push({ ...product, quantity: selectedQuantity });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    if (redirectToCart) {
      navigate('/cart', { state: { price: getTotalPrice() } });
    }
  };

  const getTotalPrice = () => {
    if (product) {
      return (product.price * selectedQuantity).toFixed(2);
    }
    return '0.00';
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, images } = product;

  return (
    <main className="product-details-page">
      <Title />
      <ImageSlider images={images} />
      <Container>
        <Row>
          <Col md={6}>
            <h3>{name}</h3>
            <p className="fs-3 fw-semibold" style={{ color: '#873143' }}>
              Preço: R$ {getTotalPrice()}
            </p>
            <p>{description}</p>
            <div>
              <span className="fw-semibold">Quantidade:</span>
              <Button
                variant="secondary"
                className="ms-3 border-0 fw-semibold text-dark"
                style={{ backgroundColor: '#E1C35D' }}
                onClick={decreaseQuantity}
              >
                -
              </Button>
              <span className="ms-2 me-2">{selectedQuantity}</span>
              <Button
                variant="secondary"
                style={{ backgroundColor: '#873143' }}
                className="border-0 fw-semibold"
                onClick={increaseQuantity}
              >
                +
              </Button>
            </div>
            <Button
              variant="primary"
              style={{ backgroundColor: '#E1C35D' }}
              className="w-100 mt-4 border-0 text-dark"
              onClick={() => handleAddToCart()}
            >
              Comprar
            </Button>
            <Button
              variant="secondary"
              className="w-100 mt-3 mb-3 border-0"
              style={{ backgroundColor: '#873143' }}
              onClick={() => handleAddToCart(false)}
            >
              Adicionar ao Carrinho
            </Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default ProductDetails;
