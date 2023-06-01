import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination/Pagination";
import { Product } from "../types";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3333/produtos?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setPages(data.pages);
      })
      .catch((error) => {
        console.log("Ocorreu um erro ao obter os produtos:", error);
      });
  }, [currentPage]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => (product.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()));

    setFilteredProducts(filteredProducts);
  }, [products, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (filteredProducts.length === 0 && searchTerm !== "") {
      setError(`Nenhum produto encontrado com o nome ${searchTerm}`);
    } else {
      setError("");
    }
  }, [filteredProducts, searchTerm]);

  return (
    <>
      <h3 style={{ backgroundColor: "#D9D9D9" }} className="mt-3 mb-3 text-center p-2">
        Mostrando Produtos
      </h3>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="shadow-sm">
              <input
                type="text"
                className="w-100 p-1 border-dark border-opacity-10"
                placeholder="Pesquisar produtos"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </Col>
        </Row>
        <Row>
          {error ? (
            <Col xs={12} className="text-center">
              <p>{error}</p>
            </Col>
          ) : (
            (searchTerm ? filteredProducts : products).map((product) => (
              <Col xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))
          )}
        </Row>
        <Pagination
          currentPage={currentPage}
          pages={pages}
          onPageChange={handlePageChange}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
        />
      </Container>
    </>
  );
}

export default Products;
