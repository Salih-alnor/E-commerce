import api from "../api";


export const getBrands = async () => {
  try {
    const response = await api.get("/brand");
    return response.data.brands;
  } catch (error) {
    throw error;
  }
};

// (Admin)
export const addBrand = async (brandData) => {
  try {
    const response = await api.post("/brand", brandData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// (Admin)
export const deleteBrand = async (brandId) => {
  try {
    await api.delete(`/brand/${brandId}`);
  } catch (error) {
    throw error;
  }
};
