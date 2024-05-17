import Container from '../../components/Container/Container';
import ImageButton from '../../components/Buttons/ImageButton';
import magnifierImage from '../../assets/images/magnifier.jpg';
import cartImage from '../../assets/images/shopping-cart.jpg';
import styles from './AdminHome.module.scss';

function AdminHome() {
  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Área do Administrador</h2>
          <nav className={styles.nav} aria-label="Selecione o seu destino">
            <ul className={styles.navList}>
              <li>
                <ImageButton
                  path="produtos"
                  text="Produtos"
                  image={magnifierImage}
                />
              </li>
              <li>
                <ImageButton path="pedidos" text="Pedidos" image={cartImage} />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </main>
  );
}

export default AdminHome;
