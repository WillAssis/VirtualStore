import { Product } from '../../types';
import styles from './Texts.module.scss';

interface Props {
  product: Product;
}

// conteúdo textual
function Texts({ product }: Props) {
  const { name, description, price } = product;

  return (
    <div className={styles.texts}>
      <div>
        <h3>Nome</h3>
        <p className={styles.paragraph} id="product-name">
          {name}
        </p>
      </div>
      <div>
        <h3>Descrição</h3>
        <p className={styles.paragraph}>{description}</p>
      </div>
      <div>
        <h3>Preço</h3>
        <p className={styles.paragraph}>R$ {price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Texts;
