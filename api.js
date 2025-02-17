import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://172.20.10.4:4000/api"; // ضع عنوان الـ API الخاص بك هنا

// إنشاء مثيل (Instance) لـ Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ إضافة التوكن تلقائيًا لكل الطلبات
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token"); // جلب التوكن من AsyncStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // إضافة التوكن إلى الهيدر
  }
  return config;
});

export default api; // تصدير المثيل لاستخدامه في الملفات الأخرى
