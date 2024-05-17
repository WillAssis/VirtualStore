import { Mock } from 'vitest';
import { User } from '../types';
import loginRequest from './loginRequest';

interface FakeResponseData {
  user: User | null;
  errors: { usernameError: string; passwordError: string };
}

// Inputs sempre válidos
const username = 'validUser';
const password = '123456';

const createFetchResponse = (data: FakeResponseData) => {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) };
};

beforeEach(() => {
  window.fetch = vi.fn();
});

describe('Failed attempts which', () => {
  describe("Don't pass browser validation", () => {
    test('Empty username', async () => {
      const { success, user, errors } = await loginRequest('', password);
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).not.toBe('');
      expect(errors.passwordError).toBe('');
    });

    test('Empty password', async () => {
      const { success, user, errors } = await loginRequest(username, '');
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.passwordError).not.toBe('');
    });

    test('Empty username and password', async () => {
      const { success, user, errors } = await loginRequest('', '');
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).not.toBe('');
      expect(errors.passwordError).not.toBe('');
    });

    test('Invalid username', async () => {
      const { success, user, errors } = await loginRequest('a', password);
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).not.toBe('');
      expect(errors.passwordError).toBe('');
    });

    test('Invalid password', async () => {
      const { success, user, errors } = await loginRequest(username, '1');
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.passwordError).not.toBe('');
    });

    test('Invalid username and password', async () => {
      const { success, user, errors } = await loginRequest('a', '1');
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).not.toBe('');
      expect(errors.passwordError).not.toBe('');
    });
  });

  describe("Don't pass backend validation", () => {
    test('Invalid usarname', async () => {
      const fakeResponse = {
        user: null,
        errors: { usernameError: 'error', passwordError: '' },
      };
      (fetch as Mock).mockResolvedValue(createFetchResponse(fakeResponse));
      const { success, user, errors } = await loginRequest(username, password);
      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('error');
      expect(errors.passwordError).toBe('');
    });

    test('Invalid password', async () => {
      const fakeResponse = {
        user: null,
        errors: { usernameError: '', passwordError: 'error' },
      };
      (fetch as Mock).mockResolvedValue(createFetchResponse(fakeResponse));
      const { success, user, errors } = await loginRequest(username, password);
      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.passwordError).toBe('error');
    });

    test('Invalid username and password', async () => {
      const fakeResponse = {
        user: null,
        errors: { usernameError: 'error1', passwordError: 'error2' },
      };
      (fetch as Mock).mockResolvedValue(createFetchResponse(fakeResponse));
      const { success, user, errors } = await loginRequest(username, password);
      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('error1');
      expect(errors.passwordError).toBe('error2');
    });
  });
});

describe('successfull attempts', () => {
  test('Valid username and password', async () => {
    const fakeResponse = {
      user: { username: 'validUser', isAdmin: false },
      errors: { usernameError: '', passwordError: '' },
    };
    (fetch as Mock).mockResolvedValue(createFetchResponse(fakeResponse));
    const { success, user, errors } = await loginRequest(username, password);
    expect(fetch).toHaveBeenCalled();
    expect(success).toBe(true);
    expect(user).toEqual({ username: 'validUser', isAdmin: false });
    expect(errors.usernameError).toBe('');
    expect(errors.passwordError).toBe('');
  });
});
