import { useEffect, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import Information from '../../components/Information/Information';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import { Container } from 'react-bootstrap';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/produtos')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <Banner />
      <Information />
      <Container>
        <FeaturedProducts products={products} />
      </Container>
    </div>
  );
}

export default Home;
