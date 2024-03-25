import { PreviousIconSVG, NextIconSVG } from './SVGIcons';
import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  pages: number;
  jump: (page: number) => void;
}

function Pagination({ currentPage, pages, jump }: Props) {
  const previusButtonDisabled: boolean = currentPage === 1;
  const nextPage = () => jump(currentPage + 1);
  const previousPage = () => jump(currentPage - 1);

  return (
    <nav className={styles.nav} aria-label="Páginas">
      <button
        className={styles.button}
        aria-label="Anterior"
        disabled={previusButtonDisabled}
        onClick={previousPage}
      >
        <PreviousIconSVG />
      </button>
      <ul className={styles.list}>
        {Array(pages)
          .fill(null)
          .map((_value, index) => (
            <li key={index}>
              <button
                className={
                  index + 1 === currentPage
                    ? `${styles.button} ${styles.buttonActive}`
                    : styles.button
                }
                onClick={() => jump(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
      <button
        className={`${styles.button} ${styles.iconButton}`}
        aria-label="Próxima"
        disabled={currentPage === pages}
        onClick={nextPage}
      >
        <NextIconSVG />
      </button>
    </nav>
  );
}

export default Pagination;
