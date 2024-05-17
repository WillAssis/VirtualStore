function validateEmail(inputValue: string) {
  const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValid = pattern.test(inputValue);

  if (inputValue.length === 0) return 'Email é requerido';
  if (!isValid)
    return 'Email inválido. exemplo de email válido: sujeito@gmail.com';
  return '';
}

export default validateEmail;
