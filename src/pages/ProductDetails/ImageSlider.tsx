import { useState, useEffect } from 'react';
import styles from './ImageSlider.module.scss';

interface Params {
  images: string[];
}

function ImageSlider({ images }: Params) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesToDisplay =
    images.length > 0 ? images : ['/images/placeholder.png'];

  // Reseta o slider quando o produto muda
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const changeImage = (index: number) => setActiveIndex(index);

  return (
    <section className={styles.slider} aria-label="Imagens do produto">
      <div>
        {imagesToDisplay.map((img, index) => (
          <img
            className={`${styles.image} ${index === activeIndex ? styles.imageVisible : styles.imageHidden}`}
            src={img}
            alt={`Imagem 1 de ${index + 1}`}
          />
        ))}
      </div>
      <nav aria-label="Selecionar imagem">
        <ul className={styles.buttonList}>
          {images.map((img, index) => (
            <li key={index}>
              <button
                className={styles.button}
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => changeImage(index)}
              >
                <span className="sr-only">
                  Imagem ${index + 1} de ${images.length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default ImageSlider;
