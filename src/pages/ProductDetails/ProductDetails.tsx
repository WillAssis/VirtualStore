import { useParams } from 'react-router-dom';
import { Product } from '../../types';
import useFetch from '../../hooks/useFetch';
import Container from '../../components/Container/Container';
import Title from '../../components/Title/Title';
import ImageSlider from './ImageSlider';
import ProductInfo from './ProductInfo';
import Loading from '../../components/Loading/Loading';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import styles from './ProductDetails.module.scss';

const DATA_URL = 'http://localhost:3333/produto';

const icon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 57 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M28.125 37.5C23.981 37.5 20.0067 35.8538 17.0765 32.9235C14.1462 29.9933 12.5 26.019 12.5 21.875H18.75C18.75 24.3614 19.7377 26.746 21.4959 28.5041C23.254 30.2623 25.6386 31.25 28.125 31.25C30.6114 31.25 32.996 30.2623 34.7541 28.5041C36.5123 26.746 37.5 24.3614 37.5 21.875H43.75C43.75 26.019 42.1038 29.9933 39.1735 32.9235C36.2433 35.8538 32.269 37.5 28.125 37.5ZM28.125 6.25C30.6114 6.25 32.996 7.23772 34.7541 8.99587C36.5123 10.754 37.5 13.1386 37.5 15.625H18.75C18.75 13.1386 19.7377 10.754 21.4959 8.99587C23.254 7.23772 25.6386 6.25 28.125 6.25ZM50 15.625H43.75C43.75 13.5731 43.3458 11.5413 42.5606 9.64557C41.7754 7.74986 40.6245 6.02737 39.1735 4.57646C37.7226 3.12554 36.0001 1.97461 34.1044 1.18938C32.2087 0.404153 30.1769 0 28.125 0C23.981 0 20.0067 1.6462 17.0765 4.57646C14.1462 7.50671 12.5 11.481 12.5 15.625H6.25C2.78125 15.625 0 18.4062 0 21.875V59.375C0 61.0326 0.65848 62.6223 1.83058 63.7944C3.00268 64.9665 4.5924 65.625 6.25 65.625H50C51.6576 65.625 53.2473 64.9665 54.4194 63.7944C55.5915 62.6223 56.25 61.0326 56.25 59.375V21.875C56.25 18.4062 53.4375 15.625 50 15.625Z" />
  </svg>
);

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch<Product>(`${DATA_URL}/${id}`);

  const images =
    data?.images.map((img) => `http://localhost:3333/images/${img}`) ?? [];

  // Redireciona para ErrorElement quando o produto não é encontrado
  if (!data && !loading) {
    throw new Response('Not found');
  }

  return (
    <main className={styles.main}>
      <Loading loading={loading} error={error}>
        <Container>
          <div className={styles.contentWrapper}>
            <Title icon={icon} text={'Comprar Produto'} />
            <section className={styles.productSection}>
              <ImageSlider images={images} />
              <ProductInfo product={data as Product} />
            </section>
            <section>
              <h3 className={styles.featuredTitle}>Leve também</h3>
              <FeaturedProducts />
            </section>
          </div>
        </Container>
      </Loading>
    </main>
  );
}

export default ProductDetails;
