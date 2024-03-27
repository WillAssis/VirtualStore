import { Link } from 'react-router-dom';

function Content() {
  return (
    <div>
      <h3>Conteúdo</h3>
      <nav aria-label="Conteúdo">
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>
            <Link to="/cadastro">Cadastro</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Content;
