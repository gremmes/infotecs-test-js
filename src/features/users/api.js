export const fetchUsers = async ({ limit, skip, filter, sort }) => {
  let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  if (filter.category && filter.searchText) {
    url += `&filterKey=${encodeURIComponent(filter.category)}&filterValue=${encodeURIComponent(filter.searchText)}`;
  }

  if (sort.key) {
    url += `&sortBy=${encodeURIComponent(sort.key)}&order=${encodeURIComponent(sort.order)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};