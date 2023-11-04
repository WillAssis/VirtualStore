function validateUsernameValue(inputValue: string) {
  return inputValue.length === 0 ? 'Nome de usuário é requerido' : '';
}

function validatePasswordValue(inputValue: string) {
  return inputValue.length === 0 ? 'Senha é requerida' : '';
}

async function login(username: string, password: string) {
  const usernameError = validateUsernameValue(username);
  const passwordError = validatePasswordValue(password);
  const isInputValid = usernameError === '' && passwordError === '';

  if (isInputValid) {
    const response = await fetch('http://localhost:3333/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    return {
      success: response.status === 201,
      user: data.user,
      errors: data.errors ?? { usernameError, passwordError },
    };
  }

  return {
    success: false,
    user: null,
    errors: { usernameError, passwordError },
  };
}

export default login;
