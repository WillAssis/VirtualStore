import { HTTPUpdateProductResponse } from '../types';
import {
  validateName,
  validateDescription,
  validatePrice,
} from './validateProduct';

const CREATE_PRODUCT_URL = 'http://localhost:3333/novo-produto';
const EDIT_PRODUCT_URL = 'http://localhost:3333/editar-produto';

// Quando slug é fornecida é feita a requisição para editar o produto, caso contrário é feita a requisição para criá-lo
// Os campos de imagem são ignorados por enquanto
async function updateProductRequest(
  formData: FormData,
  slug: string | '',
): Promise<HTTPUpdateProductResponse> {
  const url = slug ? `${EDIT_PRODUCT_URL}/${slug}` : CREATE_PRODUCT_URL;
  const method = slug ? 'PUT' : 'POST';

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
