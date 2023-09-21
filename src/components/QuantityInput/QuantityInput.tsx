import React, { useState } from 'react';
import './QuantityInput.css';

interface Params {
  quantity?: number;
  changeQuantity: (value: number) => void;
}

function QuantityInput({ quantity = 1, changeQuantity }: Params) {
  const [value, setValue] = useState(quantity);

  const increase = () => {
    changeQuantity(value + 1);
    setValue(value + 1);
  };

  const decrease = () => {
    if (value > 1) {
      changeQuantity(value - 1);
      setValue(value - 1);
    }
  };

  const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value);
    changeQuantity(newValue);
    setValue(newValue);
  };

  return (
    <div className="quantity-input">
      <button aria-label="Diminuir" onClick={decrease} disabled={value <= 1}>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </button>
      <input
        onChange={changeValue}
        type="number"
        name="quantidade"
        id="quantity"
        value={value}
      ></input>
      <button aria-label="Aumentar" onClick={increase}>
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
