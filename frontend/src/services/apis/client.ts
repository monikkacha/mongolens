import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error : ", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
