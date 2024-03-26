import styles from './TextInput.module.scss';

interface Props {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  validateInput: (value: string) => string;
  type?: string;
}

function TextInput({
  name,
  value,
  setValue,
  error,
  setError,
  validateInput,
  type,
}: Props) {
  function onInput(event: React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLInputElement>) {
    const inputValue = event.currentTarget.value;

    // Apenas valida se houver um valor
    if (inputValue) {
      const error = validateInput(inputValue);
      setValue(inputValue);
      setError(error);
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {name.slice(0, 1).toUpperCase() + name.slice(1)}
      </label>
      <input
        className={styles.input}
        type={type ?? 'text'}
        name={name}
        id={name}
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby={`${name}-error`}
        aria-invalid={error !== ''}
        aria-required="true"
      />
      <span className={styles.error} aria-live="assertive" id={`${name}-error`}>
        {error}
      </span>
    </div>
  );
}

export default TextInput;
