import { Button } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
}

function Pagination({ currentPage, productsPerPage, totalProducts, paginate }: PaginationProps) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {currentPage > 1 && (
          <li className="page-item">
            <Button
              variant="link"
              onClick={() => paginate(currentPage - 1)}
              className="page-link mt-4 text-dark fw-semibold"
            >
              Anterior
            </Button>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
            <Button
              variant="link"
              onClick={() => paginate(number)}
              className="page-link me-2 mt-4 btn-pagination fw-semibold"
            >
              {number}
            </Button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className="page-item">
            <Button
              variant="link"
              onClick={() => paginate(currentPage + 1)}
              className="page-link mt-4 text-dark fw-semibold"
            >
              Próximo
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
