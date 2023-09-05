import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#D9D9D9', padding: '1.2rem' }}>
      <Container className="fw-semibold">
        <Row className="d-flex" style={{ fontSize: '0.75rem' }}>
          <Col md={9}>
            <div className="d-flex">
              <p className="me-3">Termos e Condições</p>
              <p className="me-3">Acessibilidade</p>
              <p className="me-3">Segurança</p>
              <p>Portfólio</p>
            </div>
            <div style={{ fontSize: '0.75rem' }}>
              <p>Copyright © 2023</p>
              <p>
                CNPJ nº 66.666.666/6666-66 / Av. AAAAAAA nº 666, aaaaa, AAAA/SP
                - CEP 66666-666 - Empresa AAAAAAAAAA
              </p>
            </div>
          </Col>
          <Col md={3}>
            <p className="fs-6">Contatos: </p>
            <div className="d-flex">
              <Link
                target="_blank"
                to="https://www.facebook.com/Solus2018/?locale=pt_BR"
              >
                <img
                  src="/icons/facebook-icon.svg"
                  className="me-3"
                  width={'30px'}
                  alt="Facebook"
                />
              </Link>
              <Link
                target="_blank"
                to="https://www.instagram.com/soluscasamentos/"
              >
                <img
                  src="/icons/instagram-icon.svg"
                  className="me-3"
                  width={'30px'}
                  alt="Instagram"
                />
              </Link>
              <Link to="/">
                <img
                  src="/icons/twitter-icon.svg"
                  className="me-3"
                  width={'30px'}
                  alt="Twitter"
                />
              </Link>
              <Link
                target="_blank"
                to="https://shopee.com.br/soluspersonalizados"
              >
                <img
                  src="/icons/shopee-icon.svg"
                  className="me-3"
                  width={'30px'}
                  alt="Shopee"
                />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
