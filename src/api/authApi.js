import axiosClient from './axiosClient';

// ==================== AUTH API ====================

/**
 * Login user
 * @param {Object} credentials
 * @param {string} credentials.phone - User phone number
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Auth data with token
 */
export const login = async (credentials) => {
    // Note: The backend uses 'Phone' and 'Password' properties
    const data = {
        Phone: credentials.phone || credentials.Phone,
        Password: credentials.password || credentials.Password
    };
    
    // The axiosClient response interceptor already returns response.data
    // which contains the ApiResponse structure from your backend
    const response = await axiosClient.post('/auth/login', data);
    
    // Usually response has { data: { token, user: {...} }, success: true, message: ... }
    return response; 
}

/**
 * Register new user
 * @param {Object} userData
 * @param {string} userData.phone - User phone number
 * @param {string} userData.password - User password
 * @returns {Promise<Object>} Auth data
 */
export const register = async (userData) => {
    const response = await axiosClient.post('/auth/register', {
        phone: userData.phone || userData.Phone,
        password: userData.password || userData.Password,
    });
    return response;
}
