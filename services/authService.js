import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
};
