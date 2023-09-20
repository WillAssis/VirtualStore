import NextPageButton from './subcomponents/NextPageButton';
import PageNumberButton from './subcomponents/PageNumberButton';
import PreviousPageButton from './subcomponents/PreviousPageButton';
import './Pagination.css';

interface Params {
  currentPage: number;
  pages: number;
  jumpToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

function Pagination({
  currentPage,
  pages,
  jumpToPage,
  nextPage,
  previousPage,
}: Params) {
  return (
    <nav className="pagination" aria-label="Páginas">
      <ul>
        <li>
          <PreviousPageButton
            previousPage={previousPage}
            disabled={currentPage <= 1}
          />
        </li>
        {Array(pages)
          .fill(null)
          .map((value, page) => (
            <li key={page + 1}>
              <PageNumberButton
                jumpTo={jumpToPage}
                page={page + 1}
                active={currentPage === page + 1}
              />
            </li>
          ))}
        <li>
          <NextPageButton nextPage={nextPage} disabled={currentPage >= pages} />
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
