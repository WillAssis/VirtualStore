import productImg from '../../../assets/images/mini-calendario-de-mesa-personalizado.jpg';
import './About.css';

function About() {
  return (
    <section aria-label="Sobre a Solus" className="homepage-about">
      <h2>
        <span className="accent-text">Produtos</span> Personalizados
      </h2>
      <p>A SOLUS sabe como é bom ter algo sob medida para você. Por isso, te damos a chance de personalizar</p>
      <img src={productImg} alt="Um mini calendário de mesa personalizado" />
    </section>
  );
}

export default About;
