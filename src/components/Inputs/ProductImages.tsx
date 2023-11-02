import { useState } from 'react';
import './ProductImages.css';

const PLACEHOLDER_IMG_PATH = '/images/placeholder.png';

interface Params {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

function ProductImages({ images, setImages }: Params) {
  const [currentInput, setCurrentInput] = useState(0);

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const currentImages = images.slice();
    const inputFile = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;

    currentImages[currentInput] = inputFile
      ? URL.createObjectURL(inputFile)
      : PLACEHOLDER_IMG_PATH;

    setImages(currentImages);
  }

  function clearCurrentInput() {
    const currentImages = images.slice();
    const input = document.getElementById(
      `image${currentInput}`
    ) as HTMLInputElement;

    currentImages[currentInput] = PLACEHOLDER_IMG_PATH;
    setImages(currentImages);
    input.value = '';
  }

  /**
   * -> Os inputs são escondido visualmente com CSS mas podem receber focus off-screen
   * -> Os inputs estão antes do label para usar subsequent-sibling combinator no CSS
   * e aplicar os estilos quando há focus no input:
   *  .image-input-container input:focus ~ label {
   *    ---estilos---
   *  }
   */
  return (
    <div className="image-input-container">
      <h3>Imagens</h3>
      <input
        className="sr-only"
        type="file"
        name="images"
        id="image0"
        accept="image/*"
        onInput={onInput}
        style={{ display: `${currentInput === 0 ? 'block' : 'none'}` }}
      />
      <input
        className="sr-only"
        type="file"
        name="images"
        id="image1"
        accept="image/*"
        onInput={onInput}
        style={{ display: `${currentInput === 1 ? 'block' : 'none'}` }}
      />
      <input
        className="sr-only"
        type="file"
        name="images"
        id="image2"
        accept="image/*"
        onInput={onInput}
        style={{ display: `${currentInput === 2 ? 'block' : 'none'}` }}
      />
      <input
        className="sr-only"
        type="file"
        name="images"
        id="image3"
        accept="image/*"
        onInput={onInput}
        style={{ display: `${currentInput === 3 ? 'block' : 'none'}` }}
      />
      <input
        className="sr-only"
        type="file"
        name="images"
        id="image4"
        accept="image/*"
        onInput={onInput}
        style={{ display: `${currentInput === 4 ? 'block' : 'none'}` }}
      />
      <label
        htmlFor={`image${currentInput}`}
        style={{ backgroundImage: `url(${images[currentInput]})` }}
        aria-label={`Imagem ${currentInput + 1}`}
      ></label>
      <nav className="image-input-selector">
        <ul>
          <li>
            <button
              type="button"
              className={currentInput === 0 ? 'selected' : undefined}
              style={{ backgroundImage: `url(${images[0]})` }}
              onClick={() => setCurrentInput(0)}
            ></button>
          </li>
          <li>
            <button
              type="button"
              className={currentInput === 1 ? 'selected' : undefined}
              style={{ backgroundImage: `url(${images[1]})` }}
              onClick={() => setCurrentInput(1)}
            ></button>
          </li>
          <li>
            <button
              type="button"
              className={currentInput === 2 ? 'selected' : undefined}
              style={{ backgroundImage: `url(${images[2]})` }}
              onClick={() => setCurrentInput(2)}
            ></button>
          </li>
          <li>
            <button
              type="button"
              className={currentInput === 3 ? 'selected' : undefined}
              style={{ backgroundImage: `url(${images[3]})` }}
              onClick={() => setCurrentInput(3)}
            ></button>
          </li>
          <li>
            <button
              type="button"
              className={currentInput === 4 ? 'selected' : undefined}
              style={{ backgroundImage: `url(${images[4]})` }}
              onClick={() => setCurrentInput(4)}
            ></button>
          </li>
        </ul>
      </nav>
      <button
        type="button"
        onClick={clearCurrentInput}
        aria-label="Deletar imagem"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
      </button>
    </div>
  );
}

export default ProductImages;
