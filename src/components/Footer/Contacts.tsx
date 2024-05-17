import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

function Contacts() {
  return (
    <div className={styles.links}>
      <h3 className={styles.title}>Contatos</h3>
      <nav>
        <ul className={styles.linksList}>
          <li>
            <Link
              className={styles.link}
              target="_blank"
              to="https://www.facebook.com/Solus2018/?locale=pt_BR"
            >
              Facebook
            </Link>
          </li>
          <li>
            <Link
              className={styles.link}
              target="_blank"
              to="https://www.instagram.com/soluscasamentos/"
            >
              Instagram
            </Link>
          </li>
          <li>
            <Link
              className={styles.link}
              target="_blank"
              to="https://shopee.com.br/soluspersonalizados"
            >
              Shopee
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Contacts;
