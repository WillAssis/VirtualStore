function validateUsernameValue(inputValue: string) {
  return inputValue.length === 0 ? 'Nome de usuário é requerido' : '';
}

function validatePasswordValue(inputValue: string) {
  return inputValue.length === 0 ? 'Senha é requerida' : '';
}

function validateEmailValue(inputValue: string) {
  const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValid = pattern.test(inputValue);

  if (inputValue.length === 0) {
    return 'Email é requerido';
  } else if (!isValid) {
    return 'Email inválido. exemplo de email válido: sujeito@gmail.com';
  }

  return '';
}

async function register(username: string, email: string, password: string) {
  const usernameError = validateUsernameValue(username);
  const emailError = validateEmailValue(email);
  const passwordError = validatePasswordValue(password);
  const isInputValid =
    usernameError === '' && emailError === '' && passwordError === '';

  if (isInputValid) {
    const response = await fetch('http://localhost:3333/cadastro', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    return {
      success: response.ok,
      user: data.user,
      errors: data.errors ?? { usernameError, emailError, passwordError },
    };
  }

  return {
    success: false,
    user: null,
    errors: { usernameError, emailError, passwordError },
  };
}

export default register;
