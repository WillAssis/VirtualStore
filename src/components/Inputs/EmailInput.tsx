interface Params {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function validateEmailValue(inputValue: string) {
  const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValid = pattern.test(inputValue);

  if (inputValue.length === 0) {
    return 'Email é requerido';
  } else if (!isValid) {
    return 'Email inválido. exemplo de email válido: sujeito@gmail.com';
  }

  return '';
}

function EmailInput({ value, setValue, error, setError }: Params) {
  function onInput(event: React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLInputElement>) {
    const inputValue = event.currentTarget.value;
    const error = validateEmailValue(inputValue);
    setValue(inputValue);
    setError(error);
  }

  return (
    <div className="input-container">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby="email-error"
        aria-invalid={error !== ''}
        aria-required="true"
      />
      <span className="input-error" aria-live="assertive" id="email-error">
        {error}
      </span>
    </div>
  );
}

export default EmailInput;
