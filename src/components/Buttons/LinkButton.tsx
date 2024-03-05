import { Link } from 'react-router-dom';
import './LinkButton.css';

interface Params {
  text: string; // Texto exibido no link
  path: string; // Href do link
  image: string; // Path da imagem de fundo
}

function LinkButton({ text, path, image }: Params) {
  return (
    <Link
      to={path}
      className="link-button"
      style={{ backgroundImage: `url(${image})` }}
    >
      <span>{text}</span>
    </Link>
  );
}

export default LinkButton;
