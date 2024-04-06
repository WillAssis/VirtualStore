import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

interface Props {
  children: string | JSX.Element;
  ariaLabel?: string;
  disabled?: boolean;
  path?: string; // Se for passado o botão será um link
  style?: React.CSSProperties; // Quando for necessário modificar algum estilo
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Botão normal com texto ou icone
function Button({
  children,
  ariaLabel,
  disabled,
  path,
  style,
  onClick,
  type,
}: Props) {
  return path ? (
    <Link
      aria-label={ariaLabel}
      className={styles.button}
      to={path}
      style={style}
    >
      {children}
    </Link>
  ) : (
    <button
      aria-label={ariaLabel}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
