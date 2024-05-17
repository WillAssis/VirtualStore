// Converte um objeto Date para o formato dd/mm/yyyy
function convertDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day > 9 ? day : '0' + day}/${month > 9 ? month : '0' + month}/${year}`;
}

export default convertDate;
