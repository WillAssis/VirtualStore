/**
 * Gera uma URL com os parâmetros de número de página e termo de pesquisa
 */

function generateSearchURL(page: number, search: string | null) {
  const baseURL = 'http://localhost:3333/produtos';
  const pageParam = page > 1 ? `page=${page}` : null;
  const searchParam = search ? `search=${search.toLowerCase()}` : null;

  if (pageParam && searchParam) {
    return `${baseURL}?${pageParam}&${searchParam}`;
  } else if (pageParam || searchParam) {
    return `${baseURL}?${pageParam ?? searchParam}`;
  }

  return baseURL;
}

export default generateSearchURL;
