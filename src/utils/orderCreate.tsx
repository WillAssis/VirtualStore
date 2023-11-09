import { CartItem } from "../types";

interface orderData {
    clientId: String,
    cartItems: Array<CartItem>,
}

async function orderCreate(orderData: orderData) {
    let result;
    const orderOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pedido: {
                produtos: orderData.cartItems,
                clientId: orderData.clientId
            }
        })
    }
    try {
        result = await (await fetch('http://localhost:3333/pedido', orderOptions)).json();
    } catch(e) {
        // just to avoid errors
    }

    return result;
}

export default orderCreate;