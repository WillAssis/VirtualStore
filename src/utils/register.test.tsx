import register from './register';
import { Mock } from 'vitest';

interface FetchResponse {
  user: { username: string; isAdmin: boolean } | null;
  errors: { usernameError: string; passwordError: string; emailError: string };
}

global.fetch = vi.fn();

const createFetchResponse = (data: FetchResponse, ok = true) => {
  return { ok, json: () => new Promise((resolve) => resolve(data)) };
};

describe('Empty inputs', () => {
  test('All inputs are empty', async () => {
    const registerAttempt = await register('', '', '');
    const { success, user, errors } = { ...registerAttempt };

    expect(fetch).not.toHaveBeenCalled();
    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('Nome de usuário é requerido');
    expect(errors.emailError).toBe('Email é requerido');
    expect(errors.passwordError).toBe('Senha é requerida');
  });

  test('Username empty', async () => {
    const registerAttempt = await register('', 'abc@def.gh', '12345');
    const { success, user, errors } = { ...registerAttempt };

    expect(fetch).not.toHaveBeenCalled();
    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('Nome de usuário é requerido');
    expect(errors.emailError).toBe('');
    expect(errors.passwordError).toBe('');
  });

  test('Email empty', async () => {
    const registerAttempt = await register('user', '', '12345');
    const { success, user, errors } = { ...registerAttempt };

    expect(fetch).not.toHaveBeenCalled();
    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('');
    expect(errors.emailError).toBe('Email é requerido');
    expect(errors.passwordError).toBe('');
  });

  test('Password empty', async () => {
    const registerAttempt = await register('user', 'abc@def.gh', '');
    const { success, user, errors } = { ...registerAttempt };

    expect(fetch).not.toHaveBeenCalled();
    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('');
    expect(errors.emailError).toBe('');
    expect(errors.passwordError).toBe('Senha é requerida');
  });
});

describe('Pattern mismatch inputs', () => {
  test('Invalid email', async () => {
    const registerAttempt = await register('FaKeUsEr', 'notAnEmail', '3456789');
    const { success, user, errors } = { ...registerAttempt };

    expect(fetch).not.toHaveBeenCalled();
    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.emailError).toBe('Email inválido. exemplo de email válido: sujeito@gmail.com');
  });
});

describe('Backend is reached', () => {
  test('Successful attempt', async () => {
    const fakeData = {
      user: {
        username: 'NewUser11',
        isAdmin: false,
      },
      errors: {
        usernameError: '',
        passwordError: '',
        emailError: '',
      },
    };
    (fetch as Mock).mockResolvedValue(createFetchResponse(fakeData));

    const registerAttempt = await register('NewUser11', 'abc@def.gh', '34567');
    const { success, user } = { ...registerAttempt };

    expect(fetch).toHaveBeenCalled();
    expect(success).toBe(true);
    expect(user).toEqual({
      username: 'NewUser11',
      isAdmin: false,
    });
  });

  test('Username not available', async () => {
    const fakeData = {
      user: null,
      errors: {
        usernameError: 'Custom message',
        passwordError: '',
        emailError: '',
      },
    };
    (fetch as Mock).mockResolvedValue(createFetchResponse(fakeData, false));

    const registerAttempt = await register('UsedName', 'abc@def.gh', '34567');
    const { success, user, errors } = { ...registerAttempt };

    expect(fetch).toHaveBeenCalled();
    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('Custom message');
  });
});
