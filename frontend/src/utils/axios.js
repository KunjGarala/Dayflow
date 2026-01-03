import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.137.170:8081/api", // change if needed
  withCredentials: true, // optional (cookies)
});

// 🔐 Attach token automatically to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // or sessionStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
