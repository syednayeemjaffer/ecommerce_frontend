import axios from "axios";
import { useAuthStore } from "../store/authStore";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token =
    useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_AUTH_BASE_URL}/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken =
          refreshRes.data.accessToken;

        useAuthStore
          .getState()
          .setAccessToken(newToken);

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        return authApi(originalRequest);
      } catch {
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default authApi;