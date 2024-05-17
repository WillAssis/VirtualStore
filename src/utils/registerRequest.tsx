import validateUsername from './validateUsername';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';

const REGISTER_URL = 'http://localhost:3333/cadastro';

async function registerRequest(
  username: string,
  email: string,
  password: string,
) {
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const isValid = !usernameError && !emailError && !passwordError;

  if (isValid) {
    try {
      const response = await fetch(REGISTER_URL, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { user, errors } = await response.json();

      return {
        success: Boolean(user),
        user: user ?? null,
        errors: errors ?? { usernameError, emailError, passwordError },
      };
    } catch (error) {
      console.log(error);
    }
  }

  return {
    success: false,
    user: null,
    errors: { usernameError, emailError, passwordError },
  };
}

export default registerRequest;
