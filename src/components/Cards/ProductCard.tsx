import { Link } from 'react-router-dom';
import { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <img className="card-image" src={product.images[0]} alt={product.name} />
      <div className="card-content">
        <h3>
          <Link to={`/produtos/${product.slug}`}>{product.name}</Link>
        </h3>
        <p>
          Preço:
          <span className="accent-text"> R$ {product.price.toFixed(2)}</span>
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
