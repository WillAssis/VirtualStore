import { Mock } from 'vitest';
import { User } from '../types';
import registerRequest from './registerRequest';

interface FakeResponseData {
  user: User | null;
  errors: { usernameError: string; emailError: string; passwordError: string };
}

// Inputs sempre válidos
const username = 'validUser';
const email = 'valid.mail@email.com';
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
      const attempt = await registerRequest('', email, password);
      const { success, user, errors } = attempt;
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).not.toBe('');
      expect(errors.emailError).toBe('');
      expect(errors.passwordError).toBe('');
    });

    test('Empty email', async () => {
      const attempt = await registerRequest(username, '', password);
      const { success, user, errors } = attempt;
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.emailError).not.toBe('');
      expect(errors.passwordError).toBe('');
    });

    test('Empty password', async () => {
      const attempt = await registerRequest(username, email, '');
      const { success, user, errors } = attempt;
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.emailError).toBe('');
      expect(errors.passwordError).not.toBe('');
    });

    test('Invalid username', async () => {
      const attempt = await registerRequest('a', email, password);
      const { success, user, errors } = attempt;
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).not.toBe('');
      expect(errors.emailError).toBe('');
      expect(errors.passwordError).toBe('');
    });

    test('Invalid email', async () => {
      const attempt = await registerRequest(username, 'b', password);
      const { success, user, errors } = attempt;
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.emailError).not.toBe('');
      expect(errors.passwordError).toBe('');
    });

    test('Invalid password', async () => {
      const attempt = await registerRequest(username, email, '1');
      const { success, user, errors } = attempt;
      expect(fetch).not.toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.emailError).toBe('');
      expect(errors.passwordError).not.toBe('');
    });
  });

  describe("Don't pass backend validation", () => {
    test('Invalid usarname', async () => {
      (fetch as Mock).mockResolvedValue(
        createFetchResponse({
          user: null,
          errors: { usernameError: 'error', emailError: '', passwordError: '' },
        }),
      );

      const attempt = await registerRequest(username, email, password);
      const { success, user, errors } = attempt;

      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('error');
      expect(errors.emailError).toBe('');
      expect(errors.passwordError).toBe('');
    });

    test('Invalid email', async () => {
      (fetch as Mock).mockResolvedValue(
        createFetchResponse({
          user: null,
          errors: { usernameError: '', emailError: 'error', passwordError: '' },
        }),
      );

      const attempt = await registerRequest(username, email, password);
      const { success, user, errors } = attempt;

      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.emailError).toBe('error');
      expect(errors.passwordError).toBe('');
    });

    test('Invalid password', async () => {
      (fetch as Mock).mockResolvedValue(
        createFetchResponse({
          user: null,
          errors: { usernameError: '', emailError: '', passwordError: 'error' },
        }),
      );

      const attempt = await registerRequest(username, email, password);
      const { success, user, errors } = attempt;

      expect(fetch).toHaveBeenCalled();
      expect(success).toBe(false);
      expect(user).toBe(null);
      expect(errors.usernameError).toBe('');
      expect(errors.emailError).toBe('');
      expect(errors.passwordError).toBe('error');
    });
  });
});

describe('Successfull attempts', () => {
  test('All inputs are valid', async () => {
    (fetch as Mock).mockResolvedValue(
      createFetchResponse({
        user: { username: 'validUser', isAdmin: false },
        errors: { usernameError: '', emailError: '', passwordError: '' },
      }),
    );

    const attempt = await registerRequest(username, email, password);
    const { success, user, errors } = attempt;

    expect(fetch).toHaveBeenCalled();
    expect(success).toBe(true);
    expect(user).toEqual({ username: 'validUser', isAdmin: false });
    expect(errors.usernameError).toBe('');
    expect(errors.emailError).toBe('');
    expect(errors.passwordError).toBe('');
  });
});
