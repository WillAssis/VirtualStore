import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import products from "../data";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductSearch from "../components/ProductSearch/ProductSearch";
import Pagination from "../components/Pagination/Pagination";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filtra os produtos com base na pesquisa
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Lógica de paginação
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Função para mudar a página atual
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <h4 className="mt-3">Mostrando Produtos:</h4>
      <ProductSearch products={products} setFilteredProducts={setFilteredProducts} />
      <Row>
        {currentProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
    </Container>
  );
}

export default Products;
