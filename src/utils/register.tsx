function validateInput(input: string) {
  return input.length === 0 ? 'Preencha este campo' : '';
}

function validateEmail(email: string) {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValid = pattern.test(email);

  if (email.length === 0) {
    return 'Preencha este campo';
  } else if (!isValid) {
    return 'Email inválido. exemplo de email válido: sujeito@gmail.com';
  }

  return '';
}

async function register(username: string, email: string, password: string) {
  const usernameError = validateInput(username);
  const emailError = validateEmail(email);
  const passwordError = validateInput(password);
  const isInputValid =
    usernameError === '' && emailError === '' && passwordError === '';

  if (isInputValid) {
    const response = await fetch('http://localhost:3333/cadastro', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();

    return {
      success: response.status === 201,
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
