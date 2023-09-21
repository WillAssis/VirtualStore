import { Product, CartItem } from '../types';

function updateProductToCart(product: Product, quantity: number) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const existingItem = cartItems.find(
    (item: CartItem) => item.id === product.id
  );

  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export default updateProductToCart;
