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
export const fetchAverageRating = async (bookId) => {
  try {
    const { data } = await $host.get(`api/rating/average/${bookId}`);
    return data.averageRating;
  } catch (error) {
    console.error('Error fetching average rating:', error);
    throw error;
  }
};
export const updateBookRating = async (bookId, newRating) => {
  try {
    const response = await $authHost.patch(`api/book/${bookId}/rating`, { newRating });
    console.log('Update book rating response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error updating book rating:', error);
    throw error;
  }
};