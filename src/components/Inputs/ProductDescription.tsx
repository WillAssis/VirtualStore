interface Params {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function validateDescriptionValue(inputValue: string) {
  if (inputValue === '') {
    return 'Descrição do produto é obrigatória';
  }
  return '';
}

function ProductDescription({ value, setValue, error, setError }: Params) {
  function onInput(event: React.FormEvent<HTMLTextAreaElement>) {
    setValue(event.currentTarget.value);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLTextAreaElement>) {
    const inputValue = event.currentTarget.value;
    const error = validateDescriptionValue(inputValue);
    setValue(inputValue);
    setError(error);
  }

  return (
    <div className="input-container">
      <label htmlFor="description">Descrição</label>
      <textarea
        name="description"
        id="description"
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby="description-error"
        aria-invalid={error !== ''}
        aria-required="true"
      />
      <span className="input-error" aria-live="assertive" id="description-error">
        {error}
      </span>
    </div>
  );
}

export default ProductDescription;
