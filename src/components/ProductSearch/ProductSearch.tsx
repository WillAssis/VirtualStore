import { useState } from "react";
import { Product } from "../../types";

interface ProductSearchProps {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

function ProductSearch({ products, setFilteredProducts }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredProducts(filteredProducts);
    setSearchTerm(event.target.value);
  };

  return (
    <div className="shadow-sm">
      <input
        type="text"
        className="w-100 p-1 border-dark border-opacity-10"
        placeholder="Pesquisar produtos"
        value={searchTerm}
        onChange={handleSearch}
      />
      {noResults && <p>Nenhum produto encontrado com o nome "{searchTerm}"</p>}
    </div>
  );
}

export default ProductSearch;
