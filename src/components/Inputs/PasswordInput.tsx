interface Params {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

// TODO: incluir mais validações
function validatePasswordValue(_inputValue: string) {
  return '';
}

function PasswordInput({ value, setValue, error, setError }: Params) {
  function onInput(event: React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLInputElement>) {
    const inputValue = event.currentTarget.value;
    const error = validatePasswordValue(inputValue);
    setValue(inputValue);
    setError(error);
  }

  return (
    <div className="input-container">
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        name="password"
        id="password"
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby="password-error"
        aria-invalid={error !== ''}
        aria-required="true"
      />
      <span className="input-error" aria-live="assertive" id="password-error">
        {error}
      </span>
    </div>
  );
}

export default PasswordInput;
