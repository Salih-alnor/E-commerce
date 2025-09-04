import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const {token, user, status, message} = response.data;
    if (token) {
        await AsyncStorage.setItem("token", token);
        if (user) {
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(user)
          )
          
        }
      }
    return {token, user, status, message}
  } catch (error) {
    throw error;
  }
};


export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    const {token, user, status, message} = response.data;
    
     if (token) {
        await AsyncStorage.setItem("token", token);
        if (user) {
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(user)
          )
          
        }
      }
      return {token, user, status, message};
  } catch (error) {
    throw error;
  }
};


export const logout = async () => {

  if (token) {
        await AsyncStorage.removeItem("token");
        if (user) {
          await AsyncStorage.removeItem("user");
        }
      }  
};
