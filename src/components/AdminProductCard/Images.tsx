import { Product } from '../../types';
import styles from './Images.module.scss';

interface Props {
  product: Product;
  activeIndex: number;
}

// Image carrousel
function Images({ product, activeIndex }: Props) {
  const images = product.images;
  const imagesCount = product.images.length;

  return (
    <div>
      <h3>Imagens</h3>
      <div>
        {images.map((image, index) => (
          <img
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
