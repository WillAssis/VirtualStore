import Container from '../../components/Container/Container';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Button from '../../components/Buttons/Button';
import styles from './Featured.module.scss';

function Featured() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Produtos em destaque</h2>
          <FeaturedProducts />
          <Button text="Ver mais" path="/produtos" />
        </div>
      </Container>
    </section>
  );
}

export default Featured;
