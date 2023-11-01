import './Summary.css';

interface Params {
  totalPrice: string;
  clearCart: () => void;
}

function Summary({ totalPrice, clearCart }: Params) {
  return (
    <section aria-label="Sumário" className="cart-page-summary">
      <p className="cart-total-price">
        Total a pagar: <span className="accent-text">R$ {totalPrice}</span>
      </p>
      <div className="cart-controls">
        <button onClick={clearCart}>Limpar Carrinho</button>
        <button>Finalizar compra</button>
      </div>
    </section>
  );
}

export default Summary;
