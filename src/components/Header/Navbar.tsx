import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import styles from './Navbar.module.scss';

interface ButtonProps {
  toggleNavbar: () => void;
}

function MenuButton({ toggleNavbar }: ButtonProps) {
  return (
    <button onClick={toggleNavbar} aria-label="Menu" className={styles.button}>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          className={styles.icon}
          d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
        />
      </svg>
    </button>
  );
}

interface Props {
  hidden: boolean;
}

function Navbar({ hidden }: Props) {
  const { user } = useContext(authContext);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <nav
      className={`${styles.nav} ${hidden ? styles.navHidden : styles.navVisible}`}
    >
      <ul className={styles.list}>
        <li>
          <NavLink className={navLinkClass} to="/">
            Início
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/produtos">
            Produtos
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/carrinho">
            Carrinho
          </NavLink>
        </li>
      </ul>
      {!user && (
        <ul className={styles.list}>
          <li>
            <NavLink className={navLinkClass} to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClass} to="/cadastro">
              Cadastro
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export { Navbar, MenuButton };
