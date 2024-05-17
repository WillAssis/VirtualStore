import Logo from '../../components/Logo/Logo';
import ImageButton from '../../components/Buttons/ImageButton';
import Container from '../../components/Container/Container';
import productImage from '../../assets/images/home-products-button-background.jpg';
import loginImage from '../../assets/images/home-login-button-background.jpg';
import registerImage from '../../assets/images/home-register-button-background.jpg';
import styles from './Main.module.scss';

function Main() {
  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title} aria-label="Solus Personalizados">
            <Logo />
          </h1>
          <p className={styles.textTop}>
            O seu <span className={styles.accent}>Sonho</span> também é nosso
          </p>
          <nav className={styles.nav} aria-label="Selecione o seu destino">
            <ul className={styles.navList}>
              <li>
                <ImageButton
                  path="/produtos"
                  text="Ver produtos"
                  image={productImage}
                />
              </li>
              <li>
                <ImageButton
                  path="/login"
                  text="Fazer login"
                  image={loginImage}
                />
              </li>
              <li>
                <ImageButton
                  path="/cadastro"
                  text="Cadastrar-se"
                  image={registerImage}
                />
              </li>
            </ul>
          </nav>
          <p className={styles.textBottom}>
            Papelaria e artigos personalizados para bodas & casamentos
          </p>
        </div>
      </Container>
    </main>
  );
}

export default Main;
