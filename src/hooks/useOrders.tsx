import { useState, useEffect } from 'react';
import { Order } from '../types';

// Executa as operações de get, update e delete sobre listas de pedidos
// base_url é a url de busca inicial, podendo ser para admin ou user dependendo do componente
function useOrders(userType: 'user' | 'admin') {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Cada vez que essa variável muda os pedidos são atualizados
  const [rerunFetch, setRerunFetch] = useState<boolean>(false);

  const updateOrder = async (id: string, status: string) => {
    setLoading(true);

    const response = await fetch(`http://localhost:3333/pedido/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();

    // Atualiza lista de pedidos
    if (response.ok) {
      setRerunFetch(!rerunFetch);
    } else {
      setLoading(false);
      setError(data.error);
    }

    return { sucesss: response.ok };
  };

  const deleteOrder = async (id: string) => {
    setLoading(true);

    const response = await fetch(`http://localhost:3333/pedido/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await response.json();

    // Atualiza lista de pedidos
    if (response.ok) {
      setRerunFetch(!rerunFetch);
    } else {
      setLoading(false);
      setError(data.error);
    }

    return { sucesss: response.ok };
  };

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    fetch(`http://localhost:3333/${userType}/pedidos`, {
      signal: abortController.signal,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders);
        setError('');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error);
          setError(error.message);
        }
      })
      .finally(() => setTimeout(() => setLoading(false), 100));

    // Cancela a requisição caso uma próxima seja feita para prevenir race condition
    return () => abortController.abort();
  }, [rerunFetch]);

  return { orders, loading, error, updateOrder, deleteOrder };
}

export default useOrders;
