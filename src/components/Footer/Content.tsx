import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

function Content() {
  return (
    <div className={styles.links}>
      <h3 className={styles.title}>Conteúdo</h3>
      <nav>
        <ul className={styles.linksList}>
          <li>
            <Link className={styles.link} to="/">
              Início
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/produtos">
              Produtos
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/cadastro">
              Cadastro
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Content;
