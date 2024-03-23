import styles from './QuantityInput.module.scss';

interface Props {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

function QuantityInput({ quantity, setQuantity }: Props) {
  const downButtonDisabled = quantity <= 1;

  const decrease = () => setQuantity(quantity - 1);
  const increase = () => setQuantity(quantity + 1);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setQuantity(Number(newValue));
  };

  return (
    <div className={styles.quantity}>
      <button
        className={styles.button}
        aria-label="Diminuir"
        onClick={decrease}
        disabled={downButtonDisabled}
      >
        <svg
          className={styles.icon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </button>
      <input
        className={styles.input}
        onChange={onChange}
        type="number"
        name="quantidade"
        value={quantity}
      />
      <button
        className={styles.button}
        aria-label="Aumentar"
        onClick={increase}
      >
        <svg
          className={styles.icon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
    </div>
  );
}

export default QuantityInput;
