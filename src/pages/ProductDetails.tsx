import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Product } from "../types";
import "../App.css";

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3333/produto/${slug}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [slug]);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const increaseQuantity = () => {
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = (redirectToCart = true) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find((item: Product) => item.slug === product?.slug);

    if (existingItem) {
      existingItem.quantity += selectedQuantity;
    } else {
      cartItems.push({ ...product, quantity: selectedQuantity });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    if (redirectToCart) {
      navigate("/cart", { state: { price: getTotalPrice() } });
    }
  };

  const getTotalPrice = () => {
    if (product) {
      return (product.price * selectedQuantity).toFixed(2);
    }
    return "0.00";
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, images } = product;

  return (
    <>
      <h3 className="mt-3 mb-3 text-center p-2" style={{ backgroundColor: "#D9D9D9" }}>
        <img src="/icons/sacola.svg" className="mb-2" alt="Carrinho" style={{ width: "25px", marginRight: "10px" }} />
        Comprar Produto
      </h3>
      <Container>
        <Row>
          <Col lg={1} mt={3}>
            <Row className="row-cols-5 row-cols-lg-1">
              {images.map((image, index) => (
                <Col key={index}>
                  <div className="thumbnail-wrapper mb-4">
                    <Image
                      className="mb-4 thumbnail-image"
                      src={image}
                      alt=""
                      onClick={() => handleThumbnailClick(image)}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={5}>
            <div className="main-image-wrapper">
              <Image src={mainImage} alt={name} className="main-image" />
            </div>
          </Col>
          <Col md={6}>
            <h3>{name}</h3>
            <p className="fs-3 fw-semibold" style={{ color: "#873143" }}>
              Preço: R$ {getTotalPrice()}
            </p>
            <p>{description}</p>
            <div>
              <span className="fw-semibold">Quantidade:</span>
              <Button
                variant="secondary"
                className="ms-3 border-0 fw-semibold text-dark"
                style={{ backgroundColor: "#E1C35D" }}
                onClick={decreaseQuantity}
              >
                -
              </Button>
              <span className="ms-2 me-2">{selectedQuantity}</span>
              <Button
                variant="secondary"
                style={{ backgroundColor: "#873143" }}
                className="border-0 fw-semibold"
                onClick={increaseQuantity}
              >
                +
              </Button>
            </div>
            <Button
              variant="primary"
              style={{ backgroundColor: "#E1C35D" }}
              className="w-100 mt-4 border-0 text-dark"
              onClick={() => handleAddToCart()}
            >
              Comprar
            </Button>
            <Button
              variant="secondary"
              className="w-100 mt-3 mb-3 border-0"
              style={{ backgroundColor: "#873143" }}
              onClick={() => handleAddToCart(false)}
            >
              Adicionar ao Carrinho
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetails;
