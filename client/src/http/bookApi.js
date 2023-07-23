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

export const fetchBooks = async () => {
  const { data } = await $host.get('api/book');
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