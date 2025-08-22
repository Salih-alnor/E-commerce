import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
const API = Constants.expoConfig.extra.API;

const API_BASE_URL = `${API}/api`; 


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default api; 
