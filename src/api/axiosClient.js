import axios from 'axios';

<<<<<<< HEAD
// Create Axios Instance
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', // Configurable via .env or Vercel ENV
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Bypass Ngrok warning page
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        // Retrieve Token
        const token = localStorage.getItem('authToken');
=======
// Base URL (keep in sync with backend gateway)
const BASE_URL = 'http://localhost:5000';

// Create Axios Instance
const axiosClient = axios.create({
    baseURL: BASE_URL, // Ocelot API Gateway URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Simple helpers for tokens
const getAccessToken = () => localStorage.getItem('authToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setTokens = (token, refreshToken) => {
    if (token) localStorage.setItem('authToken', token);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};
const clearTokens = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
};

// Avoid multiple refresh calls in parallel
let isRefreshing = false;
let refreshPromise = null;

// Add a request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
>>>>>>> tri
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
<<<<<<< HEAD
    (error) => {
        return Promise.reject(error);
    }
=======
    (error) => Promise.reject(error)
>>>>>>> tri
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
<<<<<<< HEAD
        // Any request that falls in the ranges of 2xx cause this function to trigger
        return response.data; // Return only the data portion directly
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.error('API Error:', error.response?.data || error.message);
        
        // Handle 401 Unauthorized
        if (error.response && error.response.status === 401) {
             // For example, redirect to login via window.location if necessary
             // or dispatch a logout event.
             console.log("Token expired or unauthorized");
        }
        
        return Promise.reject(error.response?.data || error); // Return standard BE error
=======
        // Always return only the data portion
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        // If no response or not 401 → return as usual
        if (!status || status !== 401) {
            console.error('API Error:', error.response?.data || error.message);
            return Promise.reject(error.response?.data || error);
        }

        // If this is the refresh call itself or we've already retried, logout
        if (originalRequest._retry || originalRequest.url?.includes('/auth/refresh')) {
            clearTokens();
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
            return Promise.reject(error.response?.data || error);
        }

        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            clearTokens();
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
            return Promise.reject(error.response?.data || error);
        }

        try {
            // Ensure only one refresh request at a time
            if (!isRefreshing) {
                isRefreshing = true;
                refreshPromise = axios.post(
                    `${BASE_URL}/auth/refresh`,
                    { refreshToken },
                    { headers: { 'Content-Type': 'application/json' } }
                );
            }

            const refreshResponse = await refreshPromise;
            isRefreshing = false;
            refreshPromise = null;

            const body = refreshResponse.data;
            const inner = body?.data ?? body?.Data;
            const newToken =
                inner?.token ??
                inner?.accessToken ??
                inner?.access_token ??
                inner?.Token ??
                inner?.AccessToken;
            const newRefreshToken =
                inner?.refreshToken ??
                inner?.refresh_token ??
                inner?.RefreshToken;
            const ok = body?.success ?? body?.Success;

            if (!ok || !newToken) {
                clearTokens();
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return Promise.reject(body || error);
            }

            setTokens(newToken, newRefreshToken);

            // Mark original request as retried and set new Authorization header
            originalRequest._retry = true;
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Retry original request through axiosClient to keep interceptors
            return axiosClient(originalRequest);
        } catch (refreshErr) {
            isRefreshing = false;
            refreshPromise = null;

            const resp = refreshErr.response;
            // Nếu refresh token hết hạn / BadRequest → quay về login
            if (resp && (resp.status === 400 || resp.status === 401)) {
                clearTokens();
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }

            return Promise.reject(resp?.data || refreshErr);
        }
>>>>>>> tri
    }
);

export default axiosClient;
