import { useState, useEffect } from 'react';
import { Product, HTTPUpdateProductResponse } from '../types';
import updateProductRequest from '../utils/updateProductRequest';

const DATA_URL = 'http://localhost:3333/produto';

// Retorna o produto, se existir, e a função para criá-lo/editá-lo
function useEditor(id: string | '') {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const updateProduct = async (
    formData: FormData,
  ): Promise<HTTPUpdateProductResponse> => {
    setLoading(true);
    const response = await updateProductRequest(formData, id);
    const { success } = response;

    if (!success) {
      setLoading(false);
    }

    return response;
  };

  // Faz o fetch do produto quando id é passado
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(false);

    if (id) {
      fetch(`${DATA_URL}/${id}`, {
        credentials: 'include',
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((product) => {
          setProduct(product);
          setError('');
        })
        .catch((error) => setError(error.message))
        .finally(() => setTimeout(() => setLoading(false), 100));
    } else {
      setLoading(false);
    }

    return () => abortController.abort();
  }, [id]);

  return { product, loading, error, updateProduct };
}

export default useEditor;
