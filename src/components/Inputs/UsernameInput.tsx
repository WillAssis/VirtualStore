interface Params {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function validateUsernameValue(inputValue: string) {
  return inputValue.length === 0 ? 'Nome de usuário é requerido' : '';
}

function UsernameInput({ value, setValue, error, setError }: Params) {
  function onInput(event: React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLInputElement>) {
    const inputValue = event.currentTarget.value;
    const error = validateUsernameValue(inputValue);
    setValue(inputValue);
    setError(error);
  }

  return (
    <div className="input-container">
      <label htmlFor="username">Usuário</label>
      <input
        type="text"
        name="username"
        id="username"
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby="username-error"
        aria-invalid={error !== ''}
        aria-required="true"
      />
      <span className="input-error" aria-live="assertive" id="username-error">
        {error}
      </span>
    </div>
  );
}

export default UsernameInput;
