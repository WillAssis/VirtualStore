// Retorna a cor de um status de um pedido
function getStatusColor(status: string) {
  const lowerCasedStatus = status.toLowerCase();

  switch (lowerCasedStatus) {
    case 'pendente':
      return 'var(--special)';
    case 'aceito':
      return 'var(--valid)';
    case 'cancelado':
      return 'var(--invalid)';
    default:
      return 'var(--accent)';
  }
}

export default getStatusColor;
