import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import createOrder from '../../utils/createOrder';
import Button from '../../components/Buttons/Button';
import styles from './Summary.module.scss';

interface Params {
  totalPrice?: string;
  clearCart: () => void;
}

function Summary({ totalPrice, clearCart }: Params) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { user } = useContext(authContext);

  const finishOrder = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const { success, error, order } = await createOrder(cartItems);

    if (success) {
      sessionStorage.setItem('lastOrder', JSON.stringify(order));
      localStorage.removeItem('cart');
      navigate('/pedido');
    } else {
      setError(error);
    }
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
        {user ? (
          <Button onClick={finishOrder}>Finalizar compra</Button>
        ) : (
          <Button path="/login">Fazer login</Button>
        )}
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
      <p className={styles.error} aria-live="assertive">
        {error}
      </p>
    </section>
  );
}

export default Summary;
