import Main from './Main';
import Hero from './Hero';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';

function Home() {
  return (
    <>
      <Main />
      <Hero />
      <FeaturedProducts title="Produtos em destaque" link="/produtos" />
    </>
  );
}

export default Home;
