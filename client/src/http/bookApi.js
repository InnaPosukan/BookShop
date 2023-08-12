import { $authHost, $host } from "./index";
export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;
};
export const createBook = async (book) => {
  const { data } = await $authHost.post('api/book', book);
  return data;
};

export const fetchBooks = async (typeId, page, limit = 8) => {
  const { data } = await $host.get('api/book', {params:{typeId, page, limit}});
  return data;
};

export const fetchOneBook = async (id) => {
  try {
    const { data } = await $host.get(`api/book/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error; 
  }
};
export const sendRating = async (bookId, ratingValue, userId) => {
  try {
      const { data } = await $authHost.post(`api/rating`, { bookId, ratingValue, userId });
      return data;
  } catch (error) {
      console.error("Error sending rating:", error);
      throw error;
  }
};
