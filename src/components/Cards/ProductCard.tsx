import { Link } from 'react-router-dom';
import { Product } from '../../types';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { _id, name, price, images } = product;
  const imageSrc = `http://localhost:3333/images/${images[0]}`;

  console.log(product);

  return (
    <article className={styles.card}>
      <img className={styles.image} src={imageSrc} alt={name} />
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link className={styles.link} to={`/produtos/${_id}`}>
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
