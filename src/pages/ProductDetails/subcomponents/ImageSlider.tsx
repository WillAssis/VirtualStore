import { useState } from 'react';
import './ImageSlider.css';

interface Params {
  images: string[];
}

function ImageSlider({ images }: Params) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [mainImageAlt, setMainImageAlt] = useState(`Imagem 1 de ${images.length}`);

  function changeImage(index: number) {
    setMainImageIndex(index);
    setMainImageAlt(`Imagem ${index + 1} de ${images.length}`);
  }

  return (
    <section className="image-slider" aria-label="Imagens do produto">
      <section className="image-slider-main" aria-label="Imagem selecionada">
        <img alt={mainImageAlt} src={images[mainImageIndex]} />
      </section>
      <nav className="image-slider-controls" aria-label="Selecionar imagem">
        <ul>
          {images.map((img, index) => (
            <li key={index}>
              <button
                aria-label={`Selecionar imagem ${index + 1} de ${images.length}`}
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => changeImage(index)}
                className={mainImageIndex === index ? 'selected' : ''}
              ></button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default ImageSlider;
