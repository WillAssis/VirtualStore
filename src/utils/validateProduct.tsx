export function validateDescription(value: string) {
  if (value === '') return 'Descrição do produto é obrigatória';
  return '';
}

export function validateName(value: string) {
  if (value === '') return 'Nome do produto é obrigatório';
  return '';
}

export function validatePrice(value: string) {
  const price: number = Number(value);
  const isNumber = !Number.isNaN(price) && Number.isFinite(price);

  if (!isNumber) return 'Valor inválido, insira um número';
  if (price < 0.01) return 'Preço deve ser maior que R$ 0.01';
  return '';
}
