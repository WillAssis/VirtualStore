import { Product, CartItem } from '../types';

function updateProductToCart(product: Product, quantity: number) {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cartItems.find(
    (item: CartItem) => item._id === product._id,
  );

  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
}

export default updateProductToCart;
