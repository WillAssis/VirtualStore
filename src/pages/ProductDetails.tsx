import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import products from "../data";
import { Product } from "../types";
import "../App.css";

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find((product) => product.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]);
    }
  }, [slug]);

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
    // Verificar se o carrinho já existe no localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Verificar se o produto já está no carrinho
    const existingItem = cartItems.find((item: Product) => item.id === product?.id);

    if (existingItem) {
      // Se o produto já está no carrinho, incrementar a quantidade
      existingItem.quantity += selectedQuantity; // Somar a quantidade selecionada
    } else {
      // Se o produto não está no carrinho, adicionar ao carrinho com a quantidade selecionada
      cartItems.push({ ...product, quantity: selectedQuantity });
    }

    // Atualizar o carrinho no localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Redirecionar o usuário para a página "Cart" se necessário
    if (redirectToCart) {
      navigate("/cart", { state: { price: getTotalPrice() } });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const getTotalPrice = () => {
    return (product.price * selectedQuantity).toFixed(2);
  };

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
              {product.images.map((image, index) => (
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
              <Image src={mainImage} alt={product.title} className="main-image" />
            </div>
          </Col>
          <Col md={6}>
            <h3>{product.title}</h3>
            <p className="fs-3 fw-semibold" style={{ color: "#873143" }}>
              Preço: R$ {getTotalPrice()}
            </p>
            <p>{product.description}</p>
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
