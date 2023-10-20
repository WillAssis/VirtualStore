import login from './login';

test('Empty name and password', async () => {
  const loginAttempt = await login('', '');
  const { success, user, errors } = { ...loginAttempt };

  expect(success).toBe(false);
  expect(user).toBe(null);
  expect(errors.usernameError).toBe('Preencha este campo');
  expect(errors.passwordError).toBe('Preencha este campo');
});

test('Empty password only', async () => {
  const loginAttempt = await login('UsEr123', '');
  const { success, user, errors } = { ...loginAttempt };

  expect(success).toBe(false);
  expect(user).toBe(null);
  expect(errors.usernameError).toBe('');
  expect(errors.passwordError).toBe('Preencha este campo');
});

test('Empty name only', async () => {
  const loginAttempt = await login('', 'password12345');
  const { success, user, errors } = { ...loginAttempt };

  expect(success).toBe(false);
  expect(user).toBe(null);
  expect(errors.usernameError).toBe('Preencha este campo');
  expect(errors.passwordError).toBe('');
});

test('Successful login attempt', async () => {
  const loginAttempt = await login('FakeUser', '54321');
  const { success, user, errors } = { ...loginAttempt };

  expect(success).toBe(true);
  expect(user).toEqual({
    username: 'FakeUser',
    isAdmin: true,
  });
  expect(errors.usernameError).toBe('');
  expect(errors.passwordError).toBe('');
});
