import { Product } from '../../types';
import styles from './ImageSelector.module.scss';

interface Props {
  product: Product;
  activeIndex: number;
  setActiveIndex: (value: React.SetStateAction<number>) => void;
}

// Seletor do image carrousel
function ImageSelector({ product, activeIndex, setActiveIndex }: Props) {
  const imagesCount = product.images.length;
  const images =
    imagesCount > 0
      ? product.images.map((img) => `http://localhost:3333/images/${img}`)
      : ['/images/placeholder.png'];

  return (
    <ul className={styles.list}>
      {images.map((_img, index) => (
        <li key={index}>
          <button
            className={
              index === activeIndex
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            aria-label={`Selecionar imagem ${index + 1} de ${imagesCount}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        </li>
      ))}
    </ul>
  );
}

export default ImageSelector;
