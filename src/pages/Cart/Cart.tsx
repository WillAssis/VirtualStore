import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from './subcomponents/Title';
import ProductList from './subcomponents/ProductList';
import Summary from './subcomponents/Summary';
import { CartItem } from '../../types';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleClearCart = () => {
    localStorage.removeItem('cartItems');
    window.location.reload();
  };

  useEffect(() => {
    const storedCartItems: CartItem[] = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    setCartItems(storedCartItems);
  }, []);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const deleteItem = (itemId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const getTotalCartPrice = () => {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    return total.toFixed(2);
  };

  return (
    <main className="cart-page">
      <Title />
      {cartItems.length > 0 ? (
        <>
          <ProductList
            products={cartItems}
            updateQuantity={updateQuantity}
            deleteProduct={deleteItem}
          />
          <Summary
            totalPrice={getTotalCartPrice()}
            clearCart={handleClearCart}
          />
        </>
      ) : (
        <div className="empty-cart-container">
          <p>Seu carrinho está vazio</p>
          <Link to="/produtos">Explorar produtos</Link>
        </div>
      )}
    </main>
  );
}

export default Cart;
