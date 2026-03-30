import axiosClient from './axiosClient';

// ==================== PRODUCT API ====================

/**
 * Fetch all products or active products
 * @param {boolean} activeOnly - Default to true to fetch only active products
 * @returns {Promise<Object>} Products data
 */
export const fetchProducts = async (activeOnly = true) => {
    try {
        const endpoint = activeOnly ? '/product/active' : '/product';
        const response = await axiosClient.get(endpoint);
        return response; // Contains .data, .success, .message if structure is ApiResponse<T>
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

/**
 * Fetch single product by ID
 * @param {string|number} productId - Product ID
 * @returns {Promise<Object>} Product data
 */
export const fetchProductById = async (productId) => {
    try {
        const response = await axiosClient.get(`/product/${productId}`);
        return response;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

// ==================== CATEGORY API ====================

/**
 * Fetch all sub-categories
 * @returns {Promise<Object>} Categories data
 */
export const fetchSubCategories = async () => {
    try {
        const response = await axiosClient.get('/sub-category');
        return response;
    } catch (error) {
        console.error('Error fetching sub-categories:', error);
        throw error;
    }
}
