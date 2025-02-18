import axios from "axios";
import { useMemo } from "react";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:3000/api/",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        // Set FormData content type if needed
        if (config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle specific authentication errors
        if (error.response?.status === 401) {
          // Clear any stored tokens or user data
          localStorage.removeItem('user');
          sessionStorage.removeItem('user');
          
          // Redirect to login if not already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/account/login';
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;