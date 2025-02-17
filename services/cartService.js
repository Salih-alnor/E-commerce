import api from "../api";

export const getCartItems = async () => {
  try {
    const response = await api.get("/cart");
    return response.data.Cart;
  } catch (error) {
    throw error;
  }
};


export const addToCart = async (data, userId) => {
  try {
    const response = await api.post(`/cart/${userId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (cartItemId) => {
  try {
    const response = await api.delete(`/cart/${cartItemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
