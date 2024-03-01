interface Params {
  nextPage: () => void;
  disabled: boolean;
}

function NextPageButton({ nextPage, disabled }: Params) {
  return (
    <button className={'pagination-next'} onClick={nextPage} aria-label="Próxima página" disabled={disabled}>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg>
    </button>
  );
}

export default NextPageButton;
