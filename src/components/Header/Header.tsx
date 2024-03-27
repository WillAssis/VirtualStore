import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import Logo from '../Logo/Logo';
import Dropdown from './Dropdown';
import ThemeButton from './ThemeButton';
import './Header.css';

function Header() {
  const { user, logout } = useContext(authContext);

  return (
    <header>
      <div>
        <h1 className="logo">
          <Link aria-label="Solus Casamentos página inicial" to="/">
            <Logo />
          </Link>
        </h1>
        {user ? (
          <nav className="settings" aria-label="Configurações e conta">
            <ul>
              <Dropdown username={user.username} logout={logout} />
              <ThemeButton />
            </ul>
          </nav>
        ) : (
          <nav className="settings" aria-label="Configurações e conta">
            <ul>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/cadastro">Cadastro</NavLink>
              <ThemeButton />
            </ul>
          </nav>
        )}
      </div>
      <nav aria-label="Páginas">
        <ul>
          <li>
            <NavLink to="/">Início</NavLink>
          </li>
          <li>
            <NavLink to="/produtos">Produtos</NavLink>
          </li>
          <li>
            <NavLink to="/carrinho">Carrinho</NavLink>
          </li>
          {user && user.isAdmin ? (
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
