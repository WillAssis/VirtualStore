function validatePassword(value: string) {
  if (value.length === 0) return 'Senha é requerida';
  if (value.length < 5) return 'Deve conter no mínimo 5 caractéres';
  return '';
}

export default validatePassword;
