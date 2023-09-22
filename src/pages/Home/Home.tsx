import Main from './subcomponents/Main';
import About from './subcomponents/About';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';

function Home() {
  return (
    <>
      <Main />
      <About />
      <FeaturedProducts title="Produtos em destaque" link="/produtos" />
    </>
  );
}

export default Home;
