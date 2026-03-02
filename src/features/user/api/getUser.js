export const getUser = async(userId) => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Ошибка сети при получения пользователя: ${response.status} ${response.statusText}`);
    }
  const result = await response.json();
  return result;
}