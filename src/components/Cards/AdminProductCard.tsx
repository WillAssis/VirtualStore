import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import './AdminProductCard.css';

interface Params {
  product: Product;
  deleteProduct: (productID: string) => void;
}

function AdminProductCard({ product, deleteProduct }: Params) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <article className="admin-product-card" aria-labelledby="product-name">
      <div className="product-images">
        <h3>Imagens</h3>
        <img
          src={product.images[currentImageIndex]}
          alt={`imagem ${currentImageIndex + 1} de ${product.images.length}`}
        />
        <ul className="image-selector">
          {product.images.map((img, index) => (
            <li key={product.id + index}>
              <button
                className={
                  currentImageIndex === index
                    ? 'product-image-selector active'
                    : 'product-image-selector'
                }
                aria-label={`Selecionar imagem ${index + 1} de ${
                  product.images.length
                }`}
                onClick={() => setCurrentImageIndex(index)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-info">
        <div>
          <h3>Nome</h3>
          <p id="product-name">{product.name}</p>
        </div>
        <div>
          <h3>Descrição</h3>
          <p>{product.description}</p>
        </div>
        <div>
          <h3>Preço</h3>
          <p>R$ {product.price.toFixed(2)}</p>
        </div>
        <div className="product-controls">
          <Link to={`/admin/produtos/editar/${product.slug}`}>
            <svg
              aria-label="Editar produto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Editar</title>
              <path d="M12 16C12.8 16 13.57 15.93 14.31 15.82L17.22 12.91C15.89 13.59 14 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.13L19.39 10.74C19.57 10.56 19.78 10.42 20 10.3V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.04 7.06 20.72 11 20.97V19.13L11.17 18.96C7.84 18.76 6 17.46 6 17V14.77C7.61 15.55 9.72 16 12 16M12 5C15.87 5 18 6.5 18 7S15.87 9 12 9 6 7.5 6 7 8.13 5 12 5M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z" />
            </svg>
          </Link>
          <button
            onClick={() => deleteProduct(product.slug)}
            aria-label="Deletar produto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Deletar</title>
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default AdminProductCard;
