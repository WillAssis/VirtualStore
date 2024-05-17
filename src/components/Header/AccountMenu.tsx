import { useEffect, useContext, useRef } from 'react';
import { authContext } from '../../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AccountMenu.module.scss';

function AccountMenu() {
  const navigate = useNavigate();
  const { user, logout } = useContext(authContext);
  const menu = useRef<HTMLDetailsElement | null>(null);

  if (!user) return null;

  // O component não faz uso de state. O status open/closed é manipulado diretamente no elemento
  const closeMenuEvent = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const menuElement = menu.current;

    if (menuElement && !menuElement.contains(target)) {
      menuElement.open = false;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    document.body.addEventListener('click', closeMenuEvent);
    return () => document.body.removeEventListener('click', closeMenuEvent);
  }, []);

  return (
    <details ref={menu} className={styles.details}>
      <summary className={styles.summary} aria-label="Menu do usuário">
        <svg
          className={styles.icon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
      </summary>
      <nav className={styles.menu}>
        <p className={styles.menuTitle}>Olá, {user.username}</p>
        {user.isAdmin && (
          <Link className={styles.button} to="/admin">
            Admin
          </Link>
        )}
        <Link className={styles.button} to="/pedidos">
          Pedidos
        </Link>
        <button className={styles.button} onClick={handleLogout}>
          Sair
        </button>
      </nav>
    </details>
  );
}

export default AccountMenu;
