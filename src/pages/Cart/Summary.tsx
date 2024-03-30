import { useNavigate } from 'react-router-dom';
import orderCreate from '../../utils/orderCreate';
import Button from '../../components/Buttons/Button';
import styles from './Summary.module.scss';

interface Params {
  totalPrice?: string;
  clearCart: () => void;
}

function Summary({ totalPrice, clearCart }: Params) {
  const navigate = useNavigate();

  const finishOrder = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const orderResult = await orderCreate({ cartItems, clientId: '1' }); // @TODO: remove mocked clientId and retrieve it after login
    sessionStorage.setItem('orderResult', JSON.stringify(orderResult));
    if (orderResult) {
      localStorage.removeItem('cartItems');
    }
    navigate('/pedido');
  };

  return (
    <section className={styles.summary}>
      <h3 className={styles.title}>Sumário</h3>
      <p className={styles.paragraph}>Frete: R$ 0.00</p>
      <p className={styles.paragraph}>
        Total a pagar:{' '}
        <span className={styles.totalPrice}>R$ {totalPrice}</span>
      </p>
      <div className={styles.buttons}>
        <Button onClick={finishOrder}>Finalizar compra</Button>
        <Button
          onClick={clearCart}
          style={{
            backgroundColor: 'var(--background-primary)',
            color: 'var(--font)',
          }}
        >
          Limpar Carrinho
        </Button>
      </div>
    </section>
  );
}

export default Summary;
