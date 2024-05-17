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
    <Link to={path} className={styles.button}>
      <span className={styles.text}>{text}</span>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </Link>
  );
}

export default ImageButton;
