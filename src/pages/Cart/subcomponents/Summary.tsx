import './Summary.css';
import { useNavigate } from 'react-router-dom';

interface Params {
  totalPrice: string;
  clearCart: () => void;
}

function Summary({ totalPrice, clearCart }: Params) {
  const navigate = useNavigate();

  const finishOrder = () => {
    navigate('/pedido')
  }

  return (
    <section aria-label="Sumário" className="cart-page-summary">
      <p className="cart-total-price">
        Total a pagar: <span className="accent-text">R$ {totalPrice}</span>
      </p>
      <div className="cart-controls">
        <button onClick={clearCart}>Limpar Carrinho</button>
        <button onClick={finishOrder}>Finalizar compra</button>
      </div>
    </section>
  );
}

export default Summary;
