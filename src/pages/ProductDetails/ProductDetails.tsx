import { useParams } from 'react-router-dom';
import { Product } from '../../types';
import useFetch from '../../hooks/useFetch';
import Container from '../../components/Container/Container';
import Title from './Title';
import ImageSlider from './ImageSlider';
import ProductInfo from './ProductInfo';
import Loading from '../../components/Loading/Loading';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import styles from './ProductDetails.module.scss';

const DATA_URL = 'http://localhost:3333/produto';

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useFetch<Product>(`${DATA_URL}/${slug}`);

  return (
    <main className={styles.main}>
      <Loading loading={loading} error={error}>
        <Container>
          <div className={styles.contentWrapper}>
            <Title />
            <section className={styles.productSection}>
              <ImageSlider images={data?.images ?? []} />
              <ProductInfo product={data} />
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
