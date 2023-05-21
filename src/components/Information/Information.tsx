import { Container, Row, Col } from "react-bootstrap";

function Information() {
  return (
    <section className="p-2" style={{ backgroundColor: "#d9d9d9" }}>
      <Container>
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <div className="d-flex align-items-center">
              <img src="/icons/entrega_rapida.svg" alt="Entrega rápida" className="mr-2" />
              <div className="ms-2">
                <span className="fw-bold fs-5">Entrega Rápida</span>
                <p>Entregamos em até 55 horas</p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <div className="d-flex align-items-center">
              <img src="/icons/melhor_preco.svg" alt="Melhor preço" className="mr-3" />
              <div className="ms-2">
                <span className="fw-bold fs-5">Melhor preço</span>
                <p>Melhores preços da região</p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <div className="d-flex align-items-center">
              <img src="/icons/compra_segura.svg" alt="Compra segura" className="mr-2" />
              <div className="ms-2">
                <span className="fw-bold fs-5">Compra segura</span>
                <p>Compras rápidas e seguras</p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <div className="d-flex align-items-center">
              <img src="/icons/clientes.svg" alt="Clientes" className="mr-2" />
              <div className="ms-2">
                <span className="fw-bold fs-5">Clientes</span>
                <p>Valorizamos nossos clientes</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Information;
