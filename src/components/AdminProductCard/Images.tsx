import { Product } from '../../types';
import styles from './Images.module.scss';

interface Props {
  product: Product;
  activeIndex: number;
}

// Image carrousel
function Images({ product, activeIndex }: Props) {
  const imagesCount = product.images.length;
  const images =
    imagesCount > 0
      ? product.images.map((img) => `http://localhost:3333/images/${img}`)
      : ['/images/placeholder.png'];

  return (
    <div>
      <h3>Imagens</h3>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            className={
              index === activeIndex
                ? `${styles.image} ${styles.visible}`
                : `${styles.image} ${styles.hidden}`
            }
            src={image}
            alt={`imagem ${index + 1} de ${imagesCount}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Images;
