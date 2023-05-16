import { Link } from 'react-router-dom';
import products from '../data';

function Products() {
  return (
    <div>
      <h1>Produtos</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <Link to={`/produtos/${product.slug}`}>
            <img src={product.image} alt={product.title} width="300" />
          </Link>
          <p>{product.description}</p>
          <Link to={`/produtos/${product.slug}`}>Ver detalhes</Link>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Products;
