import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="logo.jpg" alt="logo" />
        </Link>
      </div>
      <nav className="menu">
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
