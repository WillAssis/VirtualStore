import updateProductToCart from './updateProductToCart';
import { CartItem } from '../types';

let cart: CartItem[];

const fakeProduct = {
  _id: '123456',
  name: 'Fake Product',
  description: 'not a real product',
  price: 321,
  images: ['img1', 'img2'],
  featured: true,
};

beforeEach(() => {
  cart = [
    {
      _id: '123',
      name: 'product1',
      description: 'product one',
      price: 65,
      images: ['img12', 'img26'],
      featured: false,
      quantity: 5,
    },
    {
      _id: '456',
      name: 'product2',
      description: 'product two',
      price: 21,
      images: ['img5'],
      featured: false,
      quantity: 8,
    },
  ];
  localStorage.setItem('cart', JSON.stringify(cart));
});

afterEach(() => {
  localStorage.removeItem('cart');
});

test('Cart is empty', () => {
  localStorage.removeItem('cart');
  updateProductToCart(fakeProduct, 3);

  const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');

  expect(updatedCart).toHaveLength(1);
  expect(updatedCart[0]).toEqual({
    ...fakeProduct,
    quantity: 3,
  });
});

test('Cart is not empty', () => {
  updateProductToCart(fakeProduct, 6);

  const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');

  expect(updatedCart).toHaveLength(3);
  expect(updatedCart[2]).toEqual({
    ...fakeProduct,
    quantity: 6,
  });
});

test('Cart has the product', () => {
  cart.push({ ...fakeProduct, quantity: 7 });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateProductToCart(fakeProduct, 2);

  const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');

  expect(updatedCart).toHaveLength(3);
  expect(updatedCart[2]).toEqual({
    ...fakeProduct,
    quantity: 2,
  });
});
