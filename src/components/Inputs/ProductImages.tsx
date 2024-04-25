import { useState, useEffect } from 'react';
import { Product } from '../../types';
import styles from './ProductImages.module.scss';

const PLACEHOLDER_IMG = '/images/placeholder.png';

interface Params {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  product: Product | null;
}

type Action = 'add' | 'remove' | 'replace' | 'keep' | null;

/**
 * O input type hidden é necessário no backend para saber as mudanças nas imagens
 * Sobre as combinações de operações feitas em um input sequencialmente:
 *
 *   Classificação das imagens:
 *     NOVA = imagens adicionadas pelo usuário
 *     INICIAL = imagens antigas presentes no servidor
 *     NENHUMA = nenhuma imagem presente
 *
 *   Ações possíveis:
 *     NENHUMA -> NOVA: replace quando INICIAL existir, add quando INICIAL = NENHUMA
 *     INICIAL -> NOVA: replace
 *     NOVA -> NOVA: replace quando INICIAL existir, add quando INICIAL = NENHUMA
 *     NOVA -> NENHUMA: remove quando INICIAL existir, null quando INICIAL = NENHUMA
 *     INICIAL -> NENHUMA: remove
 *
 *   Ações impossíveis:
 *     NOVA -> INICIAL
 *     NENHUMA -> INICIAL
 */

function ProductImages({ images, setImages, product }: Params) {
  const [initialImages, setInitialImages] = useState<string[]>(images); // Salva as imagens iniciais para referência
  const [activeIndex, setActiveIndex] = useState<number>(0); // Input ativo
  const [actions, setActions] = useState<Action[]>(Array(5).fill(null)); // Para o input type hidden

  useEffect(() => {
    // Cada imagem do produto tem ação default 'keep'
    const productActions = product?.images.map(() => 'keep') ?? [];
    // Cada slot vazio a ação é null até size = 5
    const newActions = [...productActions, ...Array(5).fill(null)].slice(0, 5);

    setInitialImages(product?.images || []);
    setActiveIndex(0);
    setActions(newActions);
  }, [product]);

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const imagesCopy = images.slice();
    const actionsCopy = actions.slice();

    const initialFile: string = initialImages[activeIndex]; // INICIAL ou NENHUMA
    const newFile: File | null = target.files ? target.files[0] : null; // NOVA ou NENHUMA

    // Operação: INICIAL -> NOVA
    if (initialFile && newFile) {
      actionsCopy[activeIndex] = 'replace';
      // Operação: NENHUMA -> NOVA ou NOVA -> NOVA
    } else {
      actionsCopy[activeIndex] = initialFile ? 'replace' : 'add';
    }

    // Substitui pela imagem nova na interface
    if (newFile) {
      imagesCopy[activeIndex] = URL.createObjectURL(newFile);
    } else {
      imagesCopy[activeIndex] = '';
    }

    setImages(imagesCopy);
    setActions(actionsCopy);
  }

  function clearCurrentInput() {
    const imagesCopy: string[] = images.slice();
    const actionsCopy: Action[] = actions.slice();
    const inputs = document.querySelectorAll('input[type="file"]');

    const initialFile: string = initialImages[activeIndex]; // INICIAL ou NENHUMA

    // Operação: NOVA -> NENHUMA ou INICIAL -> NENHUMA
    actionsCopy[activeIndex] = initialFile ? 'remove' : null;

    imagesCopy[activeIndex] = ''; // Remove imagem da interface
    (inputs[activeIndex] as HTMLInputElement).value = '';

    setImages(imagesCopy);
    setActions(actionsCopy);
  }

  // ESTRUTURA: Um carrousel de labels com background image, parecido com ImageSlider em ProductDetails
  // ACESSIBILIDADE: Os inputs e textos do label são escondidos off-screen e podem receber focus
  // VALOR DOS INPUTS: Não há uso de state, as files são enviadas em objeto FormData
  return (
    <fieldset className={styles.contentWrapper}>
      <legend className={styles.legend}>Imagens</legend>
      <div className={styles.inputsWrapper}>
        {Array(5)
          .fill(null)
          .map((_element, index) => (
            <label
              key={index}
              className={`${styles.label} ${index === activeIndex ? styles.labelVisible : styles.labelHidden}`}
              style={{
                backgroundImage: `url(${images[index] || PLACEHOLDER_IMG})`,
              }}
            >
              <span className="sr-only">Imagem {index + 1}</span>
              <input
                className="sr-only"
                type="file"
                name="images"
                accept="image/*"
                onInput={onInput}
              />
            </label>
          ))}
      </div>
      <nav aria-label="Selecionar imagem">
        <ul className={styles.buttonList}>
          {Array(5)
            .fill(null)
            .map((_element, index) => (
              <li key={index}>
                <button
                  className={styles.buttonWithImage}
                  aria-label={`Imagem ${index + 1}`}
                  type="button"
                  style={{
                    backgroundImage: `url(${images[index] || PLACEHOLDER_IMG})`,
                  }}
                  onClick={() => setActiveIndex(index)}
                ></button>
              </li>
            ))}
        </ul>
      </nav>
      <div className={styles.controls}>
        <button
          className={styles.button}
          type="button"
          onClick={clearCurrentInput}
          aria-label="Deletar imagem"
        >
          <svg
            className={styles.icon}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
        </button>
      </div>
      <input type="hidden" name="actions" value={JSON.stringify(actions)} />
    </fieldset>
  );
}

export default ProductImages;
