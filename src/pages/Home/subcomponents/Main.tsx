import Logo from '../../../components/Logo/Logo';
import LinkButton from '../../../components/Buttons/LinkButton';
import productImage from '../../../assets/images/home-products-button-background.jpg';
import loginImage from '../../../assets/images/home-login-button-background.jpg';
import registerImage from '../../../assets/images/home-register-button-background.jpg';
import './Main.css';

function Main() {
  return (
    <main className="homepage-main">
      <h1 aria-label="Solus Personalizados">
        <Logo />
      </h1>
      <p>
        O seu <span className="accent-text">Sonho</span> também é nosso
      </p>
      <nav aria-label="Selecione o seu destino">
        <ul>
          <li>
            <LinkButton
              path="/produtos"
              text="Ver produtos"
              image={productImage}
            />
          </li>
          <li>
            <LinkButton path="/login" text="Fazer login" image={loginImage} />
          </li>
          <li>
            <LinkButton
              path="/cadastro"
              text="Cadastrar-se"
              image={registerImage}
            />
          </li>
        </ul>
      </nav>
      <p>Papelaria e artigos personalizados para bodas & casamentos</p>
    </main>
  );
}

export default Main;
