import './SearchBar.css';

interface Params {
  search: (event: React.FormEvent<HTMLFormElement>) => void;
}

function SearchBar({ search }: Params) {
  return (
    <form
      className="search-bar"
      onSubmit={search}
      aria-label="Pesquisar produto"
    >
      <label htmlFor="search">Pesquisar: </label>
      <input
        id="search"
        name="search"
        type="search"
        placeholder="Pesquisar produto"
      ></input>
      <button>Buscar</button>
    </form>
  );
}

export default SearchBar;
