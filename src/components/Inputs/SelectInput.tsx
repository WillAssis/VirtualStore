import styles from './SelectInput.module.scss';

interface Props {
  name: string;
  label: string;
  values: any[];
  labels: string[];
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

function SelectInput({ name, label, values, labels, setValue }: Props) {
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select className={styles.select} name={name} id={name} onInput={onInput}>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {labels[index]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
