import { HTTPUpdateProductResponse } from '../types';
import {
  validateName,
  validateDescription,
  validatePrice,
} from './validateProduct';

const BASE_URL = 'http://localhost:3333/produto';

// Quando id é fornecida é feita a requisição para editar o produto, caso contrário é feita a requisição para criá-lo
// Os campos de imagem são ignorados por enquanto
async function updateProductRequest(
  formData: FormData,
  id: string | '',
): Promise<HTTPUpdateProductResponse> {
  const url = id ? `${BASE_URL}/${id}` : BASE_URL;
  const method = id ? 'PUT' : 'POST';

  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;

  const nameError = validateName(name);
  const priceError = validatePrice(price);
  const descriptionError = validateDescription(description);
  const isValid = !nameError && !priceError && !descriptionError;

  if (isValid) {
    try {
      const response = await fetch(url, {
        credentials: 'include',
        method: method,
        body: formData,
      });
      const { errors } = await response.json();

      return {
        success: response.ok,
        errors: errors ?? { nameError, descriptionError, priceError },
      };
    } catch (error) {
      console.log(error);
    }
  }

  return {
    success: false,
    errors: { nameError, descriptionError, priceError },
  };
}

export default updateProductRequest;
