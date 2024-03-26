import Button from '../Buttons/Button';
import styles from './SearchBar.module.scss';

interface Params {
  search: (event: React.FormEvent<HTMLFormElement>) => void;
}

function SearchBar({ search }: Params) {
  return (
    <form
      className={styles.form}
      onSubmit={search}
      aria-label="Pesquisar produto"
      role="search"
    >
      <label className={styles.label} htmlFor="search">
        Pesquisar:
      </label>
      <input
        className={styles.input}
        id="search"
        name="search"
        type="search"
        placeholder="Pesquisar produto"
      ></input>
      <Button
        style={{
          borderRadius: '0 2rem 2rem 0',
          outlineOffset: '0',
          outlineColor: 'var(--accent)',
        }}
      >
        Buscar
      </Button>
    </form>
  );
}

export default SearchBar;
