import { Button } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  pages: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

function Pagination({ currentPage, pages, onPageChange, onPreviousPage, onNextPage }: PaginationProps) {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPreviousPage();
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages) {
      onNextPage();
    }
  };

  return (
    <div className="pagination d-flex justify-content-center mt-3 mb-3">
      <Button
        variant="link"
        onClick={goToPreviousPage}
        className={`btn btn-sm ${currentPage === 1 ? "btn-light disabled" : "page-link text-dark fw-semibold"}`}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-light"}`}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="link"
        onClick={goToNextPage}
        className={`btn btn-sm ${currentPage === pages ? "btn-light disabled" : "page-link text-dark fw-semibold"}`}
        disabled={currentPage === pages}
      >
        Próximo
      </Button>
    </div>
  );
}

export default Pagination;
