import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div>
      <h3>Contatos</h3>
      <nav aria-label="Redes sociais">
        <ul>
          <li>
            <Link target="_blank" to="https://www.facebook.com/Solus2018/?locale=pt_BR">
              Facebook
            </Link>
          </li>
          <li>
            <Link target="_blank" to="https://www.instagram.com/soluscasamentos/">
              Instagram
            </Link>
          </li>
          <li>
            <Link target="_blank" to="https://shopee.com.br/soluspersonalizados">
              Shopee
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Contact;
