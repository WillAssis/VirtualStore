import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.paragraph}>Não há nada aqui</p>
      <Link className={styles.link} to="/">
        <svg
          className={styles.icon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M20,10V14H11L14.5,17.5L12.08,19.92L4.16,12L12.08,4.08L14.5,6.5L11,10H20Z" />
        </svg>
        Voltar ao início
      </Link>
    </main>
  );
}

export default NotFound;
