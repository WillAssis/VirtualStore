import styles from './PriceInput.module.scss';

interface Props {
  label: string;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  validateInput: (value: string) => string;
}

function PriceInput({
  label,
  name,
  value,
  setValue,
  error,
  setError,
  validateInput,
}: Props) {
  function onInput(event: React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLInputElement>) {
    const inputValue: string = event.currentTarget.value;
    if (inputValue) {
      const error = validateInput(inputValue);
      setValue(Number(inputValue).toFixed(2));
      setError(error);
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        type="number"
        name={name}
        id={name}
        min="0.01"
        step="0.01"
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

export default PriceInput;
