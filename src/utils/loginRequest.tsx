import { HTTPLoginResponse } from '../types';
import validateUsername from './validateUsername';
import validatePassword from './validatePassword';

const LOGIN_URL = 'http://localhost:3333/login';

async function loginRequest(
  username: string,
  password: string,
): Promise<HTTPLoginResponse> {
  const usernameError = validateUsername(username);
  const passwordError = validatePassword(password);
  const isValid = !usernameError && !passwordError;

  if (isValid) {
    try {
      const response = await fetch(LOGIN_URL, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { user, errors } = await response.json();

      return {
        success: Boolean(user),
        user: user ?? null,
        errors: errors ?? { usernameError, passwordError },
      };
    } catch (error) {
      console.log(error);
    }
  }

  return {
    success: false,
    user: null,
    errors: { usernameError, passwordError },
  };
}

export default loginRequest;
