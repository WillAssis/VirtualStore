import { useState } from 'react';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import updateProductToCart from '../../utils/updateProductToCart';
import QuantityInput from '../../components/QuantityInput/QuantityInput';
import Button from '../../components/Buttons/Button';
import styles from './ProductInfo.module.scss';

interface Props {
  product: Product;
}

function ProductInfo({ product }: Props) {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const navigate = useNavigate();

  const { name, description, price } = product || {};

  const handleAddToCart = () => {
    if (product) {
      updateProductToCart(product, selectedQuantity);
      navigate('/carrinho');
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <h3 className={styles.title}>{name ?? 'Sem nome'}</h3>
      <p className={styles.description}>{description ?? 'Sem descrição'}</p>
      <div className={styles.row}>
        <p className={styles.price}>Preço: R$ {(price ?? 0).toFixed(2)}</p>
        <div className={styles.quantity}>
          <QuantityInput
            quantity={selectedQuantity}
            setQuantity={setSelectedQuantity}
          />
        </div>
      </div>
      <p>
        Valor total:{' '}
        <span className={styles.accent}>
          R$ {((price ?? 0) * selectedQuantity).toFixed(2)}
        </span>
      </p>
      <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
    </div>
  );
}

export default ProductInfo;
