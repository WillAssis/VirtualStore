import { useState } from 'react';
import { CartItem } from '../../types';
import QuantityInput from '../QuantityInput/QuantityInput';
import './CartProductCard.css';

interface Params {
  product: CartItem;
  outerUpdateQuantity: (itemId: number, newQuantity: number) => void;
  deleteProduct: (itemId: number) => void;
}

function CartProductCard({ product, outerUpdateQuantity, deleteProduct }: Params) {
  const { id, name, price, images } = { ...product };
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      outerUpdateQuantity(id, newQuantity);
      setQuantity(newQuantity);
    }
  };

  return (
    <article className="cart-product-card">
      <img className="cart-product-image" src={images[0]} alt={name} />
      <div className="cart-product-content">
        <h3>{name}</h3>
        <p>
          <span>Preço: </span>
          <span>R$ {price.toFixed(2)}</span>
        </p>
        <p>
          <span>Quantidade: </span>
          <span>{quantity}</span>
        </p>
        <p>
          <span>Total: </span>
          <span className="accent-text">R$ {(price * quantity).toFixed(2)}</span>
        </p>
        <div className="cart-product-controls">
          <label htmlFor="quantity" className="sr-only">
            Alterar quantidade:
          </label>
          <QuantityInput quantity={quantity} setQuantity={updateQuantity} />
          <button className="delete-product-button" onClick={() => deleteProduct(id)} aria-label="Deletar produto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartProductCard;
