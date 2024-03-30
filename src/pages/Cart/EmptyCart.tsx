import Button from '../../components/Buttons/Button';
import styles from './EmptyCart.module.scss';

function EmptyCart() {
  return (
    <div className={styles.contentWrapper}>
      <p className={styles.paragraph}>Seu carrinho está vazio</p>
      <Button path="/produtos" style={{ display: 'block' }}>
        Explorar produtos
      </Button>
    </div>
  );
}

export default EmptyCart;
