import axios from 'axios';

// Create Axios Instance
const axiosClient = axios.create({
    baseURL: 'http://localhost:5000', // Ocelot API Gateway URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        // Retrieve Token
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
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
    }
);

export default axiosClient;
