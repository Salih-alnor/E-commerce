import api from "../api";


export const getCategories = async () => {
  try {
    const response = await api.get("/category");
    return response.data.categories;
  } catch (error) {
    throw error;
  }
};

// (Admin)
export const addCategory = async (categoryData) => {
  try {
    const response = await api.post("/category", categoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
