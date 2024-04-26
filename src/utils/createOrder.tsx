import { CartItem, HTTPCreateOrderResponse } from '../types';

const CREATE_ORDER_URL = 'http://localhost:3333/pedido';

const validateQuantities = (cartItems: CartItem[]) => {
  const quantities = cartItems.map(({ quantity }) => Number(quantity));

  for (const quantity of quantities) {
    if (!Number.isInteger(quantity) || quantity < 1) return false;
  }

  return true;
};

// Cria um pedido no backend
async function createOrder(
  cartItems: CartItem[],
): Promise<HTTPCreateOrderResponse> {
  const haveProducts = cartItems.length > 0;
  const isQuantitiesValid = validateQuantities(cartItems);

  if (haveProducts && isQuantitiesValid) {
    try {
      // Simplifica o body pois o backend só precisa receber o id e a quantidade do produto
      const products = cartItems.map(({ _id, quantity }: CartItem) => {
        return { _id, quantity: Number(quantity) };
      });
      const response = await fetch(CREATE_ORDER_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
      });
      const data = await response.json();

      return {
        success: response.ok,
        error: data.error ?? '',
        order: data.order,
      };
    } catch (error) {
      console.log(error);
    }
  }

  return {
    success: false,
    error: 'Ocorreu um erro',
    order: null,
  };
}

export default createOrder;
