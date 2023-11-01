import updateProductToCart from './updateProductToCart';
import { CartItem } from '../types';

let cart: CartItem[];

const fakeProduct = {
  id: 123,
  name: 'Fake Product',
  slug: 'fake-product',
  description: 'not a real product',
  price: 321,
  images: ['img1', 'img2'],
  featured: true,
};

beforeEach(() => {
  cart = [
    {
      id: 34,
      name: 'product1',
      slug: 'product-1',
      description: 'product one',
      price: 65,
      images: ['img12', 'img26'],
      featured: false,
      quantity: 5,
    },
    {
      id: 89,
      name: 'product2',
      slug: 'product-2',
      description: 'product two',
      price: 21,
      images: ['img5'],
      featured: false,
      quantity: 8,
    },
  ];
  localStorage.setItem('cartItems', JSON.stringify(cart));
});

afterEach(() => {
  localStorage.removeItem('cartItems');
});

test('Cart is empty', () => {
  localStorage.removeItem('cartItems');
  updateProductToCart(fakeProduct, 3);

  const updatedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

  expect(updatedCart).toHaveLength(1);
  expect(updatedCart[0]).toEqual({
    ...fakeProduct,
    quantity: 3,
  });
});

test('Cart is not empty', () => {
  updateProductToCart(fakeProduct, 6);

  const updatedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

  expect(updatedCart).toHaveLength(3);
  expect(updatedCart[2]).toEqual({
    ...fakeProduct,
    quantity: 6,
  });
});

test('Cart has the product', () => {
  cart.push({ ...fakeProduct, quantity: 7 });
  localStorage.setItem('cartItems', JSON.stringify(cart));
  updateProductToCart(fakeProduct, 2);

  const updatedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

  expect(updatedCart).toHaveLength(3);
  expect(updatedCart[2]).toEqual({
    ...fakeProduct,
    quantity: 2,
  });
});
