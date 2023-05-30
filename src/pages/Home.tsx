import Banner from "../components/Banner/Banner";
import Information from "../components/Information/Information";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import { Container } from "react-bootstrap";
import products from "../data";

function Home() {
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
