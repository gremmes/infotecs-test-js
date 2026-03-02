import { searchParams } from '../../../entities/seach-params'

const buildQueryString = () => {
  const params = searchParams;
  const query = Object.values(params)
    .map((value) => `${encodeURIComponent(value)}`)
    .join(',');
  return query;
};

export const fetchUsers = async ({ limit, skip, filter, sort }) => {
  let baseUrl = `https://dummyjson.com/users`;

  const createQueryString = (baseUrl) => {
    const params = [];

    if (filter.category !== null && filter.searchText !== null) {
      params.push(`/filter?key=${encodeURIComponent(filter.category)}&value=${encodeURIComponent(filter.searchText)}`)
    } else {
      params.push('?');
    }

    if (sort.key !== null) {
      params.push(`sortBy=${encodeURIComponent(sort.key)}`);
      if (sort.order !== null) {
        params.push(`order=${encodeURIComponent(sort.order)}`);
      }
    }
    params.push(`limit=${limit}`);
    params.push(`skip=${skip}`);
    params.push(`select=${buildQueryString()}`);

    const queryString = baseUrl + params.join('&');
    return queryString;
  }

  const url = createQueryString(baseUrl);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};