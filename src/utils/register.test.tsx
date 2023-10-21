import register from './register';

describe('Empty inputs', () => {
  test('All inputs are empty', async () => {
    const registerAttempt = await register('', '', '');
    const { success, user, errors } = { ...registerAttempt };

    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('Preencha este campo');
    expect(errors.emailError).toBe('Preencha este campo');
    expect(errors.passwordError).toBe('Preencha este campo');
  });

  test('Username empty', async () => {
    const registerAttempt = await register('', 'abc@def.gh', '12345');
    const { success, user, errors } = { ...registerAttempt };

    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('Preencha este campo');
    expect(errors.emailError).toBe('');
    expect(errors.passwordError).toBe('');
  });

  test('Email empty', async () => {
    const registerAttempt = await register('user', '', '12345');
    const { success, user, errors } = { ...registerAttempt };

    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('');
    expect(errors.emailError).toBe('Preencha este campo');
    expect(errors.passwordError).toBe('');
  });

  test('Password empty', async () => {
    const registerAttempt = await register('user', 'abc@def.gh', '');
    const { success, user, errors } = { ...registerAttempt };

    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('');
    expect(errors.emailError).toBe('');
    expect(errors.passwordError).toBe('Preencha este campo');
  });
});

describe('Pattern mismatch inputs', () => {
  test('Invalid email', async () => {
    const registerAttempt = await register('FaKeUsEr', 'notAnEmail', '3456789');
    const { success, user, errors } = { ...registerAttempt };

    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.emailError).toBe(
      'Email inválido. exemplo de email válido: sujeito@gmail.com'
    );
  });
});

describe('Backend is reached', () => {
  test('Successful attempt', async () => {
    const registerAttempt = await register('NewUser11', 'abc@def.gh', '34567');
    const { success, user } = { ...registerAttempt };

    expect(success).toBe(true);
    expect(user).toEqual({
      username: 'NewUser11',
      isAdmin: false,
    });
  });

  test('Username not available', async () => {
    const registerAttempt = await register('UsedName', 'abc@def.gh', '34567');
    const { success, user, errors } = { ...registerAttempt };

    expect(success).toBe(false);
    expect(user).toBe(null);
    expect(errors.usernameError).toBe('Custom error message from backend');
  });
});
