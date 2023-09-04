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
    console.log('Update book rating response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error updating book rating:', error);
    throw error;
  }
};
export const addToCart = async (bookId, quantity) => { 
  try {
    const { data } = await $authHost.post('api/cart/add', { bookId, quantity }); 
    return data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (cartId) => {
  try {
    const { data } = await $authHost.delete(`api/cart/remove/${cartId}`);
    return data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};
export const fetchCartData = async () => {
  try {
    const { data } = await $authHost.get('api/cart/view');
    return data;
  } catch (error) {
    console.error('Error fetching cart data:', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (cartItemId, newQuantity) => {
  try {
    const { data } = await $authHost.patch(`api/cart/update/${cartItemId}`, { quantity: newQuantity });
    return data;
  } catch (error) {
    console.error('Error updating item quantity:', error);
    throw error;
  }
};

export const createOrders = async (orderData ) => {
  try {
    const { data } = await $host.post("api/order", orderData);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
export const fetchOrderHistory = async () => {
  try {
    const { data } = await $authHost.get('api/order/history');
    return data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};
export const fetchAllOrders = async () => {
  try {
    const { data } = await $authHost.get('api/order/all');
    return data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const { data } = await $authHost.patch(`api/order/status/${orderId}`, { newStatus });
    return data;
  } catch (error) {
    console.error(`Error updating order status to "${newStatus}":`, error);
    throw error;
  }
};
export const deleteBookById = async (bookId) => {
  try {
    const { data } = await $authHost.delete(`api/book/${bookId}`);
    return data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
export const fetchTopNewBooks = async (limit = 4) => {
  try {
    const { data } = await $host.get('api/book', {
      params: {
        _sort: 'createdAt', 
        _order: 'desc',    
        _limit: limit       
      }
    });
    return data;
  } catch (error) {
    console.error('Error fetching top new books:', error);
    throw error;
  }
};
export const deleteTypeById = async (typeId) => {
  try {
    const { data } = await $authHost.delete(`api/type/${typeId}`);
    return data;
  } catch (error) {
    console.error('Error deleting type by ID:', error);
    throw error;
  }
};
