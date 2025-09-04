import api from "../api";


export const getProducts = async () => {
  try {
    const response = await api.get("/product");
    return {products} = response.data;
  } catch (error) {
    throw error;
  }
};

// (Admin)
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/product", productData);
    return {data} = response;
  } catch (error) {
    throw error;
  }
};

// (Admin)
export const deleteProduct = async (productId) => {
  try {
    await api.delete(`/product/${productId}`);
  } catch (error) {
    throw error;
  }
};
