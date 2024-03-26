import { Link } from 'react-router-dom';
import styles from './ImageButton.module.scss';

interface Props {
  text: string;
  path: string;
  image: string;
}

// Um botão com uma imagem de fundo
function ImageButton({ text, path, image }: Props) {
  return (
    <Link
      to={path}
      className={styles.button}
      style={{ backgroundImage: `url(${image})` }}
    >
      <span className={styles.text}>{text}</span>
    </Link>
  );
}

export default ImageButton;
