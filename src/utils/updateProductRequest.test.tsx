import { Mock } from 'vitest';
import { HTTPUpdateProductResponse } from '../types';
import updateProductRequest from './updateProductRequest';

interface MakeRequestProps {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
}

// Usa valores válidos como default
const makeRequest = async ({
  id,
  name,
  description,
  price,
}: MakeRequestProps): Promise<HTTPUpdateProductResponse> => {
  const formData = new FormData();
  formData.append('name', name ?? 'New Product');
  formData.append('description', description ?? 'lorem ipsum dolor sit amet');
  formData.append('price', price ?? '12.34');
  const requestAttempt = await updateProductRequest(formData, id || '');
  return requestAttempt;
};

interface InputErrorProps {
  nameError?: string;
  descriptionError?: string;
  priceError?: string;
}

const createFetchResponse = ({
  nameError,
  descriptionError,
  priceError,
}: InputErrorProps) => {
  const failedRequest = Boolean(nameError || descriptionError || priceError);
  const data = {
    errors: {
      nameError: nameError ?? '',
      descriptionError: descriptionError ?? '',
      priceError: priceError ?? '',
    },
  };
  return {
    ok: !failedRequest,
    json: () => new Promise((resolve) => resolve(data)),
  };
};

beforeEach(() => {
  window.fetch = vi.fn();
});

// TODO: aumentar o número de validações, elas dependem das funções no módulo validateProduct.tsx
describe('Failed attempts which', () => {
  describe("Don't pass browser validation", () => {
    test('Empty name', async () => {
      const { success, errors } = await makeRequest({ name: '' });
      const { nameError, descriptionError, priceError } = errors;

      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(nameError).not.toBe('');
      expect(descriptionError).toBe('');
      expect(priceError).toBe('');
    });

    test('Empty description', async () => {
      const { success, errors } = await makeRequest({ description: '' });
      const { nameError, descriptionError, priceError } = errors;

      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(nameError).toBe('');
      expect(descriptionError).not.toBe('');
      expect(priceError).toBe('');
    });

    test('Empty price', async () => {
      const { success, errors } = await makeRequest({ price: '' });
      const { nameError, descriptionError, priceError } = errors;

      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(nameError).toBe('');
      expect(descriptionError).toBe('');
      expect(priceError).not.toBe('');
    });

    test('Invalid price', async () => {
      const { success, errors } = await makeRequest({ price: 'a' });
      const { nameError, descriptionError, priceError } = errors;

      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(nameError).toBe('');
      expect(descriptionError).toBe('');
      expect(priceError).not.toBe('');
    });
  });

  describe("Don't pass backend validation", () => {
    test('Invalid name', async () => {
      (fetch as Mock).mockResolvedValue(
        createFetchResponse({ nameError: 'error' }),
      );

      const { success, errors } = await makeRequest({});
      const { nameError, descriptionError, priceError } = errors;

      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(nameError).toBe('error');
      expect(descriptionError).toBe('');
      expect(priceError).toBe('');
    });

    test('Invalid description', async () => {
      (fetch as Mock).mockResolvedValue(
        createFetchResponse({ descriptionError: 'error' }),
      );

      const { success, errors } = await makeRequest({});
      const { nameError, descriptionError, priceError } = errors;

      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(nameError).toBe('');
      expect(descriptionError).toBe('error');
      expect(priceError).toBe('');
    });

    test('Invalid price', async () => {
      (fetch as Mock).mockResolvedValue(
        createFetchResponse({ priceError: 'error' }),
      );

      const { success, errors } = await makeRequest({});
      const { nameError, descriptionError, priceError } = errors;

      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(nameError).toBe('');
      expect(descriptionError).toBe('');
      expect(priceError).toBe('error');
    });
  });
});

describe('Successfull attempts', () => {
  test('All inputs are valid', async () => {
    (fetch as Mock).mockResolvedValue(createFetchResponse({}));

    const { success, errors } = await makeRequest({});
    const { nameError, descriptionError, priceError } = errors;

    expect(fetch).toHaveBeenCalled();
    expect(success).toBe(true);
    expect(nameError).toBe('');
    expect(descriptionError).toBe('');
    expect(priceError).toBe('');
  });
});

describe('Fetch behaviour when', () => {
  describe('id is not given', () => {
    test('should be called with clean URL', async () => {
      const creationURL = 'http://localhost:3333/produto';

      (fetch as Mock).mockResolvedValue(createFetchResponse({}));
      await makeRequest({});

      const firstArg = (fetch as Mock).mock.calls[0][0];
      expect(firstArg).toBe(creationURL);
    });

    test('should be called with method POST', async () => {
      (fetch as Mock).mockResolvedValue(createFetchResponse({}));
      await makeRequest({});

      const secondArg = (fetch as Mock).mock.calls[0][1];
      expect(secondArg.method).toBe('POST');
    });
  });

  describe('id is given', () => {
    test('should be called with URL having id', async () => {
      const id = 'asdfghjk';
      const editionURL = 'http://localhost:3333/produto';
      const finalURL = `${editionURL}/${id}`;

      (fetch as Mock).mockResolvedValue(createFetchResponse({}));
      await makeRequest({ id });

      const firstArg = (fetch as Mock).mock.calls[0][0];
      expect(firstArg).toBe(finalURL);
    });

    test('should be called with method PUT', async () => {
      (fetch as Mock).mockResolvedValue(createFetchResponse({}));
      await makeRequest({ id: '123456789' });

      const secondArg = (fetch as Mock).mock.calls[0][1];
      expect(secondArg.method).toBe('PUT');
    });
  });
});
