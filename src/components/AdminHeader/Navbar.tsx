import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

interface ButtonProps {
  toggleNavbar: () => void;
}

function MenuButton({ toggleNavbar }: ButtonProps) {
  return (
    <button
      onClick={toggleNavbar}
      aria-label="Menu"
      className={styles.menuButton}
    >
      <svg
        className={styles.menuButtonIcon}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </svg>
    </button>
  );
}

interface NavbarProps {
  isHidden: boolean;
}

function Navbar({ isHidden }: NavbarProps) {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <nav
      className={`${styles.nav} ${isHidden ? styles.navHidden : styles.navVisible}`}
    >
      <ul className={styles.list}>
        <li>
          <NavLink className={navLinkClass} to="/admin" end>
            <svg
              className={styles.icon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22" />
            </svg>
            Início
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/admin/produtos">
            <svg
              className={styles.icon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.06 3C4.63 3 4.22 3.14 3.84 3.42S3.24 4.06 3.14 4.5L2.11 8.91C1.86 10 2.06 10.95 2.72 11.77L3 12.05V19C3 19.5 3.2 20 3.61 20.39S4.5 21 5 21H11V19.11L11.11 19H5V13H5.25C6.16 13 6.89 12.67 7.45 12.05C8.08 12.67 8.86 13 9.8 13C10.64 13 11.38 12.67 12 12.05C12.69 12.67 13.45 13 14.3 13C15.17 13 15.92 12.67 16.55 12.05C16.8 12.33 17.09 12.54 17.41 12.7L19.06 11.05L19.07 11.06L19.2 10.92C19.06 10.97 18.91 11 18.75 11C18.44 11 18.17 10.9 17.95 10.66C17.73 10.43 17.61 10.16 17.58 9.84L16.97 5L18.89 4.97L19.97 9.38C20.06 9.79 20 10.16 19.73 10.5C20.4 10.1 21.23 10.03 21.95 10.31C22 9.87 22 9.41 21.89 8.91L20.86 4.5C20.73 4.06 20.5 3.7 20.13 3.42C19.77 3.14 19.38 3 18.94 3M5.06 5H7.03L6.42 9.84C6.3 10.63 5.91 11 5.25 11C4.84 11 4.53 10.86 4.31 10.55C4.03 10.2 3.94 9.81 4.03 9.38M9.05 5H11V9.7C11 10.05 10.89 10.35 10.64 10.62C10.39 10.88 10.08 11 9.7 11C9.36 11 9.07 10.88 8.84 10.59S8.5 10 8.5 9.66V9.5M13 5H14.95L15.5 9.5C15.58 9.92 15.5 10.27 15.21 10.57C14.95 10.87 14.61 11 14.2 11C13.89 11 13.61 10.88 13.36 10.62C13.11 10.35 13 10.05 13 9.7M15.06 22H13V19.94L19.06 13.88L21.11 15.93M20.65 12.3C20.75 12.2 20.87 12.15 21 12.14C21.15 12.14 21.31 12.19 21.42 12.3L22.7 13.58C22.91 13.79 22.91 14.14 22.7 14.35L21.7 15.35L19.65 13.3Z" />
            </svg>
            Produtos
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/admin/pedidos">
            <svg
              className={styles.icon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19 20C19 21.11 18.11 22 17 22C15.89 22 15 21.1 15 20C15 18.89 15.89 18 17 18C18.11 18 19 18.9 19 20M7 18C5.89 18 5 18.89 5 20C5 21.1 5.89 22 7 22C8.11 22 9 21.11 9 20S8.11 18 7 18M7.2 14.63L7.17 14.75C7.17 14.89 7.28 15 7.42 15H19V17H7C5.89 17 5 16.1 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2H4.27L5.21 4H20C20.55 4 21 4.45 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63M8.5 11H10V9H7.56L8.5 11M11 9V11H14V9H11M14 8V6H11V8H14M17.11 9H15V11H16L17.11 9M18.78 6H15V8H17.67L18.78 6M6.14 6L7.08 8H10V6H6.14Z" />
            </svg>
            Pedidos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export { Navbar, MenuButton };
