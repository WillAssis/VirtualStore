import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import './Banner.css';

const imagesBanner = [
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=804',
  'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
];

function Banner() {
  return (
    <Carousel className="custom">
      <Carousel.Item className="custom">
        <img
          className="d-block w-100 h-100"
          src={imagesBanner[0]}
          alt="First slide"
        />
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
        <img
          className="d-block w-100 h-100"
          src={imagesBanner[1]}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Produtos Personalizados</h3>
          <p>
            A SOLUS sabe como é bom ter algo sob medida para você. Por isso, te
            damos a chance de personalizar
          </p>
          <Link to="/produtos">
            <Button type="button" className="btn btn-custom">
              Ver Produtos
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="custom">
        <img
          className="d-block w-100 h-100"
          src={imagesBanner[2]}
          alt="Third slide"
        />
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
    </Carousel>
  );
}

export default Banner;
