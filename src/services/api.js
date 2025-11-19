import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    if (
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/refresh")
    ) {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// TOKEN REFRESH LOGIC
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for login request
    if (originalRequest.url.includes("/auth/login")) {
      return Promise.reject(error);
    }

    // HANDLE 401 TOKEN EXPIRED
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token found");

        const res = await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"
          }/auth/refresh`,
          { token: refreshToken }
        );

        const { token: newToken } = res.data;

        localStorage.setItem("token", newToken);

        api.defaults.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // GENERIC ERROR
    const message =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again.";
    toast.error(message);

    return Promise.reject(error);
  }
);

export default api;
