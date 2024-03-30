import { CartItem } from '../../types';
import useStorage from '../../hooks/useStorage';
import ProductList from './ProductList';
import Summary from './Summary';
import EmptyCart from './EmptyCart';
import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import styles from './Cart.module.scss';

const icon = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 63 63"
  >
    <path
      d="M50.125 50.25C46.6562 50.25 43.875 53.0312 43.875 56.5C43.875 58.1576 44.5335 59.7473 45.7056 60.9194C46.8777 62.0915 48.4674 62.75 50.125 62.75C51.7826 62.75 53.3723 62.0915 54.5444 60.9194C55.7165 59.7473 56.375 58.1576 56.375 56.5C56.375 53.0312 53.5625 50.25 50.125 50.25ZM0.125 0.25V6.5H6.375L17.625 30.2188L13.375 37.875C12.9062 38.75 12.625 39.7812 12.625 40.875C12.625 42.5326 13.2835 44.1223 14.4556 45.2944C15.6277 46.4665 17.2174 47.125 18.875 47.125H56.375V40.875H20.1875C19.9803 40.875 19.7816 40.7927 19.6351 40.6462C19.4886 40.4997 19.4062 40.3009 19.4062 40.0938C19.4062 39.9375 19.4375 39.8125 19.5 39.7188L22.3125 34.625H45.5938C47.9375 34.625 50 33.3125 51.0625 31.4062L62.25 11.1875C62.4687 10.6875 62.625 10.1562 62.625 9.625C62.625 8.7962 62.2958 8.00134 61.7097 7.41529C61.1237 6.82924 60.3288 6.5 59.5 6.5H13.2812L10.3438 0.25M18.875 50.25C15.4062 50.25 12.625 53.0312 12.625 56.5C12.625 58.1576 13.2835 59.7473 14.4556 60.9194C15.6277 62.0915 17.2174 62.75 18.875 62.75C20.5326 62.75 22.1223 62.0915 23.2944 60.9194C24.4665 59.7473 25.125 58.1576 25.125 56.5C25.125 53.0312 22.3125 50.25 18.875 50.25Z"
      fill="black"
    />
  </svg>
);

function Cart() {
  const { item, updateItem, removeItem } = useStorage<CartItem[]>('cart');

  const isEmpty = item && item.length > 0;
  const totalPrice = item
    ?.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
    .toFixed(2);

  const handleClearCart = removeItem;

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (item) {
      const newCart = item.map((product: CartItem) => {
        if (product.id === id) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      updateItem(newCart);
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (item) {
      const newCart = item.filter((product: CartItem) => product.id !== id);
      updateItem(newCart);
    }
  };

  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.contentWrapper}>
          <Title icon={icon} text="Carrinho" />
          {isEmpty ? (
            <div className={styles.cart}>
              <Summary totalPrice={totalPrice} clearCart={handleClearCart} />
              <ProductList
                products={item}
                updateQuantity={handleUpdateQuantity}
                deleteProduct={handleDeleteProduct}
              />
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      </Container>
    </main>
  );
}

export default Cart;
