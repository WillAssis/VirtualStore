import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "./Banner.css";

function Banner() {
  return (
    <Carousel className="custom">
      <Carousel.Item className="custom">
        <img className="d-block w-100 h-100" src="/images/imagem_banner1.jpeg" alt="Primeiro slide" />
        <Carousel.Caption>
          <h3>Papelaria para Casamentos</h3>
          <p>Papelaria e artigos personalizados para bodas & casamentos</p>
          <Link to="/produtos">
            <Button type="button" className="btn btn-custom">
              Ver Produtos
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="custom">
        <img className="d-block w-100 h-100" src="/images/imagem_banner2.jpeg" alt="Segundo slide" />

        <Carousel.Caption>
          <h3>Produtos Personalizados</h3>
          <p>A SOLUS sabe como é bom ter algo sob medida para você. Por isso, te damos a chance de personalizar</p>
          <Link to="/produtos">
            <Button type="button" className="btn btn-custom">
              Ver Produtos
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="custom">
        <img className="d-block w-100 h-100" src="/images/imagem_banner3.jpeg" alt="Terceiro slide" />
        <Carousel.Caption>
          <h3>O seu sonho também é nosso!</h3>
          <p>Estamos presentes em mais de 2000 histórias de amor</p>
          <Link to="/produtos">
            <Button type="button" className="btn btn-custom">
              Ver Produtos
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="custom">
        <img className="d-block w-100 h-100" src="/images/imagem_banner4.jpeg" alt="Quarto slide" />
        <Carousel.Caption>
          <h3>Produtos Exclusivos</h3>
          <p>Descubra nossas novidades e produtos exclusivos</p>
          <Link to="/produtos">
            <Button type="button" className="btn btn-custom">
              Ver Produtos
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
