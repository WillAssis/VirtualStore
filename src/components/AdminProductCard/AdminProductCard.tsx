import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import Button from '../Buttons/Button';
import Images from './Images';
import ImageSelector from './ImageSelector';
import Texts from './Texts';
import Controls from './Controls';
import styles from './AdminProductCard.module.scss';

interface Params {
  product: Product;
  deleteProduct: (productID: string) => void;
}

function AdminProductCard({ product, deleteProduct }: Params) {
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  return (
    <article className={styles.card} aria-labelledby="product-name">
      <div className={styles.imagesWrapper}>
        <Images product={product} activeIndex={visibleImageIndex} />
        <ImageSelector
          product={product}
          activeIndex={visibleImageIndex}
          setActiveIndex={setVisibleImageIndex}
        />
      </div>
      <div className={styles.textsWrapper}>
        <Texts product={product} />
      </div>
      <div className={styles.controlsWrapper}>
        <Controls
          product={product}
          deleteProduct={() => deleteProduct(product.slug)}
        />
      </div>
    </article>
  );
}

export default AdminProductCard;
