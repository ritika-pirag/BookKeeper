import axios from "axios";
import { apiUrl } from "./conflig";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// Request Interceptor to attach the token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log("Sending Request with Token:", token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
