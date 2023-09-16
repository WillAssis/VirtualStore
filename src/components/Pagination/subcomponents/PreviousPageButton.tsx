interface Params {
  previousPage: () => void;
  disabled: boolean;
}

function PreviousPageButton({ previousPage, disabled }: Params) {
  return (
    <button
      onClick={previousPage}
      aria-label="Página anterior"
      disabled={disabled}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
      </svg>
    </button>
  );
}

export default PreviousPageButton;
