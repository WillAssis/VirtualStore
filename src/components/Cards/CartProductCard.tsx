import { useState } from 'react';
import { CartItem } from '../../types';
import QuantityInput from '../QuantityInput/QuantityInput';
import styles from './CartProductCard.module.scss';

const PLACEHOLDER_IMG = '/images/placeholder.png';

interface Props {
  product: CartItem;
  outerUpdateQuantity: (id: string, newQuantity: number) => void;
  deleteProduct: (id: string) => void;
}

function CartProductCard({
  product,
  outerUpdateQuantity,
  deleteProduct,
}: Props) {
  const { _id, name, price, images } = product;
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const imageSrc = images[0]
    ? `http://localhost:3333/images/${images[0]}`
    : '/images/placeholder.png';

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      outerUpdateQuantity(_id, newQuantity);
      setQuantity(newQuantity);
    }
  };

  return (
    <article className={styles.card}>
      <img className={styles.image} src={imageSrc} alt={name} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.paragraph}>Preço: R$ {price.toFixed(2)}</p>
        <p className={styles.paragraph}>Quantidade: {quantity}</p>
        <p className={`${styles.paragraph} ${styles.totalPrice}`}>
          Total: R$ {(price * quantity).toFixed(2)}
        </p>
        <div className={styles.controls}>
          <QuantityInput
            quantity={quantity}
            setQuantity={handleUpdateQuantity}
            label="Alterar quantidade"
          />
          <button
            className={styles.button}
            aria-label="Deletar"
            onClick={() => deleteProduct(_id)}
          >
            <svg
              className={styles.icon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartProductCard;
