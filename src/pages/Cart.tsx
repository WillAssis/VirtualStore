import { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import products from "../data";

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity: number;
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleClearCart = () => {
    localStorage.removeItem("cartItems");
    window.location.reload();
  };

  useEffect(() => {
    const storedCartItems: CartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCartItems);
  }, []);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity) {
      const updatedQuantity = item.quantity + 1;
      updateQuantity(itemId, updatedQuantity);
    }
  };

  const decreaseQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity && item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      updateQuantity(itemId, updatedQuantity);
    }
  };

  const removeItem = (itemId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const getTotalItemPrice = (item: CartItem) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const getTotalCartPrice = () => {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    return total.toFixed(2);
  };

  return (
    <>
      <h3 className="mt-3 mb-3 text-center p-2" style={{ backgroundColor: "#D9D9D9" }}>
        <img src="/icons/carrinho.svg" className="mb-1" style={{ width: "35px" }} alt="Comprar Produto" /> Produtos no
        Carrinho
      </h3>
      <Container>
        <Row>
          <Col>
            {cartItems.length === 0 ? (
              <p className="fs-4">Seu carrinho está vazio</p>
            ) : (
              <>
                <ul className="p-0">
                  <Row xs={1} md={2} lg={2} className="g-4">
                    {cartItems.map((item) => {
                      const product = products.find((p) => p.id === item.id);
                      if (!product) {
                        return null;
                      }

                      return (
                        <Col key={item.id}>
                          <Card className="mb-3">
                            <Row className="g-0">
                              <Col md={4}>
                                <Card.Img
                                  src={product.images[0]}
                                  className="img-fluid rounded-start"
                                  alt={product.title}
                                />
                              </Col>
                              <Col md={7}>
                                <Card.Body>
                                  <Card.Title>
                                    <span style={{ color: "#873143" }}>{item.quantity}</span> x {product.title}
                                  </Card.Title>
                                  <Card.Text>{product.description}</Card.Text>
                                  <Card.Text className="fw-bolder fs-4" style={{ color: "#873143" }}>
                                    R$ {getTotalItemPrice(item)}
                                  </Card.Text>
                                </Card.Body>
                              </Col>
                              <Col
                                md={1}
                                className="d-flex flex-row align-items-center justify-content-center flex-md-column"
                                style={{ backgroundColor: "#ccc" }}
                              >
                                <span className="d-inline-block p-2">
                                  <img
                                    src="/icons/mais.svg"
                                    alt="Mais"
                                    className="icon"
                                    onClick={() => increaseQuantity(item.id)}
                                  />
                                </span>
                                <span className="d-inline-block p-2">
                                  <img
                                    src="/icons/menos.svg"
                                    alt="Menos"
                                    className="icon"
                                    onClick={() => decreaseQuantity(item.id)}
                                  />
                                </span>
                                <span className="d-inline-block p-2">
                                  <img
                                    src="/icons/deletar.svg"
                                    alt="Deletar"
                                    className="icon"
                                    onClick={() => removeItem(item.id)}
                                  />
                                </span>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </ul>
                <p className="fs-4">
                  Total a pagar: R${" "}
                  <span className="fw-bolder" style={{ color: "#873143" }}>
                    {getTotalCartPrice()}
                  </span>
                </p>
                <Button variant="danger" className="mb-2" onClick={handleClearCart}>
                  Limpar Carrinho
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart;
