interface Params {
  jumpTo: (page: number) => void;
  page: number;
  active: boolean;
}

function PageNumberButton({ jumpTo, page, active }: Params) {
  return (
    <button className={active ? 'pagination-button active' : 'pagination-button'} onClick={() => jumpTo(page)}>
      {page}
    </button>
  );
}

export default PageNumberButton;
