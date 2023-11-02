interface Params {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function validateNameValue(inputValue: string) {
  if (inputValue === '') {
    return 'Nome do produto é obrigatório';
  }
  return '';
}

function ProductName({ value, setValue, error, setError }: Params) {
  function onInput(event: React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLInputElement>) {
    const inputValue = event.currentTarget.value;
    const error = validateNameValue(inputValue);
    setValue(inputValue);
    setError(error);
  }

  return (
    <div className="input-container">
      <label htmlFor="name">Nome</label>
      <input
        type="text"
        name="name"
        id="name"
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby="name-error"
        aria-invalid={error !== ''}
        aria-required="true"
      />
      <span className="input-error" aria-live="assertive" id="name-error">
        {error}
      </span>
    </div>
  );
}

export default ProductName;
