import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="mt-3 shadow-sm" style={{ height: "96%" }}>
      <Link to={`/produtos/${product.slug}`}>
        <Card.Img variant="top" src={product.images[0]} />
      </Link>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="fs-5 fw-semibold" style={{ color: "#873143" }}>
          Preço: R$ {product.price.toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
