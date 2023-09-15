import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="informations">
        <div className="about">
          <h3>Sobre nós</h3>
          <p>Oferecemos artigos personalizados para bodas e casamentos</p>
        </div>
        <div className="links">
          <div>
            <h3>Conteúdo</h3>
            <nav aria-label="Conteúdo">
              <ul>
                <li>
                  <Link to="/">Início</Link>
                </li>
                <li>
                  <Link to="/produtos">Produtos</Link>
                </li>
                <li>
                  <Link to="/">Cadastro</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h3>Contatos</h3>
            <nav aria-label="Redes sociais">
              <ul>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.facebook.com/Solus2018/?locale=pt_BR"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.instagram.com/soluscasamentos/"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://shopee.com.br/soluspersonalizados"
                  >
                    Shopee
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="legal-informations">
        <p>Copyright © 2023 SOLUS Personalizados</p>
        <p>CNPJ nº 55.555.555/5555-55</p>
      </div>
    </footer>
  );
}

export default Footer;
