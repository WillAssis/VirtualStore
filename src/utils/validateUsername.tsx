function validateUsername(value: string) {
  if (value.length === 0) return 'Nome de usuário é requerido';
  if (value.length < 4) return 'Deve conter no mínimo 4 caractéres';
  return '';
}

export default validateUsername;
