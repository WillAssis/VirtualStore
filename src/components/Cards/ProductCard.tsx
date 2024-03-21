import { Link } from 'react-router-dom';
import { Product } from '../../types';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { name, price, images, slug } = product;

  return (
    <article className={styles.card}>
      <img className={styles.image} src={images[0]} alt={name} />
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link className={styles.link} to={`/produtos/${slug}`}>
            {name}
          </Link>
        </h3>
        <p>
          Preço:
          <span className={styles.accent}> R$ {price.toFixed(2)}</span>
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
