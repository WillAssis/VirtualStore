interface Params {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function validatePriceValue(priceValue: string) {
  const value: number = Number(priceValue);

  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return 'Valor inválido, insira um número';
  } else if (value < 0.01) {
    return 'Preço deve ser maior que R$ 0.01';
  }
  return '';
}

function ProductPrice({ value, setValue, error, setError }: Params) {
  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const inputValue: string = event.currentTarget.value;
    setValue(inputValue);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLInputElement>) {
    const inputValue: string = event.currentTarget.value;
    const error = validatePriceValue(inputValue);
    setValue(Number(inputValue).toFixed(2));
    setError(error);
  }

  return (
    <div className="input-container">
      <label htmlFor="price">Preço</label>
      <input
        type="number"
        name="price"
        id="price"
        min="0.01"
        step="0.01"
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby="price-error"
        aria-invalid={error !== ''}
        aria-required="true"
      />
      <span className="input-error" aria-live="assertive" id="price-error">
        {error}
      </span>
    </div>
  );
}

export default ProductPrice;
