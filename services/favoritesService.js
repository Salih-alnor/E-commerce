import api from "../api";


export const getFavoritesList = async () => {
  try {
    const response = await api.get("/favorite");
    return response.data.favoritesList;
  } catch (error) {
    throw error;
  }
};


export const addToFavorites = async (productId) => {
  try {
    const response = await api.post("/favorite", { productId });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const removeFromFavorites = async (productId) => {
  try {
    const response = await api.delete(`/favorite/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
