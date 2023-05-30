import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../../types";

interface FeaturedProductsProps {
  products: Product[];
}

function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featuredProducts = products.filter((product) => product.destaque).slice(0, 4);

  return (
    <Container>
      <h3 className="text-center mt-4 mb-4">Produtos em Destaque</h3>
      <Row>
        {featuredProducts.map((product) => (
          <Col key={product.id} md={3}>
            <Card className="mb-4" style={{ boxShadow: "3px 3px 10px #ccc" }}>
              <Card.Text
                className="fs-5 m-0 p-2 text-dark fw-semibold align-items-center text-center"
                style={{ height: "75px", backgroundColor: "#ededed" }}
              >
                {product.title}
              </Card.Text>
              <Link to={`/produtos/${product.slug}`}>
                <Card.Img variant="top" src={product.images[0]} alt={product.title} />
              </Link>
              <Card.Text className="fs-5 p-1 fw-semibold p-2" style={{ color: "#873143", backgroundColor: "#ededed" }}>
                Preço: R$ {product.price.toFixed(2)}
              </Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FeaturedProducts;
