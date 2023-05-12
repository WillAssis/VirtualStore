import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data';

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find((product) => product.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Produto</h1>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <img src={product.image} alt={product.title} width="300" />
      <p>Preço: R$ {product.price.toFixed(2)}</p>
      <p>Categoria: {product.category}</p>
    </div>
  );
}

export default ProductDetails;
