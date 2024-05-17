import { Mock } from 'vitest';
import createOrder from './createOrder';

const validProducts = [
  { _id: 'asdfghj', quantity: 5, randomData: 'random' },
  { _id: '125788980', quantity: '2', cats: 'meow' },
  { _id: 'sgeryweqwqwr', quantity: 12, hello: 'world' },
];

const invalidProduct = { _id: '09874537', quantity: 'aaa' };

const createFetchResponse = (data: any, success: boolean) => {
  return { ok: success, json: () => new Promise((resolve) => resolve(data)) };
};

beforeEach(() => {
  window.fetch = vi.fn();
});

describe('Failed attempts which', () => {
  describe("Don't pass function validation", () => {
    test('No products is passed', async () => {
      const { success, error, order } = await createOrder([]);

      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(error).not.toBe('');
      expect(order).toBeNull();
    });

    test('Only one invalid product is passed', async () => {
      const cartItems = [invalidProduct] as any;
      const { success, error, order } = await createOrder(cartItems);

      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(error).not.toBe('');
      expect(order).toBeNull();
    });

    test('Array passed has one invalid product', async () => {
      const cartItems = [invalidProduct, ...validProducts] as any;
      const { success, error, order } = await createOrder(cartItems);

      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(error).not.toBe('');
      expect(order).toBeNull();
    });
  });

  describe('Is refused by backend', () => {
    test('For any reason', async () => {
      const response = { error: 'Error message from server', order: null };
      const cartItems = validProducts as any;

      (fetch as Mock).mockResolvedValue(createFetchResponse(response, false));
      const { success, error, order } = await createOrder(cartItems);

      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(error).toBe('Error message from server');
      expect(order).toBeNull();
    });
  });
});

describe('Successfull attempts', () => {
  test('Valid products accepted by backend', async () => {
    const response = { error: null, order: { name: 'order from server' } };
    const cartItems = validProducts as any;

    (fetch as Mock).mockResolvedValue(createFetchResponse(response, true));
    const { success, error, order } = await createOrder(cartItems);

    expect(fetch).toHaveBeenCalled();
    expect(success).toBe(true);
    expect(error).toBe('');
    expect(order).not.toBeNull();
  });
});
