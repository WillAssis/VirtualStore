function validateInput(input: string) {
  return input.length === 0 ? 'Preencha este campo' : '';
}

async function login(username: string, password: string) {
  const usernameError = validateInput(username);
  const passwordError = validateInput(password);
  const isInputValid = usernameError === '' && passwordError === '';

  if (isInputValid) {
    const response = await fetch('http://localhost:3333/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    return {
      success: true,
      user: data.user,
      errors: { usernameError, passwordError },
    };
  }

  return {
    success: false,
    user: null,
    errors: { usernameError, passwordError },
  };
}

export default login;
