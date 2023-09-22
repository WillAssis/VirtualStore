import React from 'react';
import './QuantityInput.css';

interface Params {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

// quantity e setQuantity são hooks externos
function QuantityInput({ quantity, setQuantity }: Params) {
  return (
    <div className="quantity-input">
      <button
        aria-label="Diminuir"
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </button>
      <input
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          setQuantity(Number(event.currentTarget.value))
        }
        type="number"
        name="quantidade"
        id="quantity"
        value={quantity}
      ></input>
      <button aria-label="Aumentar" onClick={() => setQuantity(quantity + 1)}>
        <svg
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
