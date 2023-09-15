import { Link, NavLink } from 'react-router-dom';
import { User } from '../../types';
import Logo from '../Logo/Logo';
import Dropdown from './subcomponents/Dropdown';
import ThemeButton from './subcomponents/ThemeButton';
import './Header.css';

interface Params {
  user: User | null;
  logout: () => void;
}

function Header({ user, logout }: Params) {
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
              <NavLink to="/">Login</NavLink>
              <NavLink to="/">Cadastro</NavLink>
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
            <NavLink to="/cart">Carrinho</NavLink>
          </li>
          {user && user.isAdmin ? (
            <li>
              <NavLink to="/">Admin</NavLink>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
