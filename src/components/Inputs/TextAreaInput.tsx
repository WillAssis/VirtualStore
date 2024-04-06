import styles from './TextAreaInput.module.scss';

interface Props {
  label: string;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  validateInput: (value: string) => string;
}

function TextAreaInput({
  label,
  name,
  value,
  setValue,
  error,
  setError,
  validateInput,
}: Props) {
  function onInput(event: React.FormEvent<HTMLTextAreaElement>) {
    setValue(event.currentTarget.value);
  }

  function onFocus() {
    setError('');
  }

  function onBlur(event: React.FormEvent<HTMLTextAreaElement>) {
    const inputValue = event.currentTarget.value;
    if (inputValue) {
      const error = validateInput(inputValue);
      setValue(inputValue);
      setError(error);
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        className={styles.input}
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

export default TextAreaInput;
