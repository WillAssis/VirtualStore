import Container from '../../components/Container/Container';
import productImg from '../../assets/images/mini-calendario-de-mesa-personalizado.jpg';
import styles from './Hero.module.scss';

function Hero() {
  return (
    <section className={styles.hero} aria-label="Sobre a Solus">
      <Container>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>
            <span className={styles.accent}>Produtos</span> Personalizados
          </h2>
          <p className={styles.text}>
            A SOLUS sabe como é bom ter algo sob medida para você. Por isso, te
            damos a chance de personalizar
          </p>
          <img
            className={styles.image}
            src={productImg}
            alt="Um mini calendário de mesa personalizado"
          />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
