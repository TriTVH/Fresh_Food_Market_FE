import axiosClient from './axiosClient';

/**
 * Place a new order
 * @param {Object} orderData - Contains userId, paymentMethod, paymentStatus, items 
 * @returns {Promise<Object>}
 */
export const placeOrder = async (orderData) => {
    try {
        const response = await axiosClient.post('/orders', orderData);
        return response; // Minimal API returns the object directly, not wrapped in ApiResponse usually, but let's check
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
}

/**
 * Get orders for a specific user
 * @param {string} userId 
 * @returns {Promise<Object>}
 */
export const fetchUserOrders = async (userId) => {
    try {
        const response = await axiosClient.get(`/orders?userId=${userId}`);
        return response;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
}

/**
 * Get all orders (for Admin)
 * @returns {Promise<Object>}
 */
export const getOrders = async () => {

    try {
        const response = await axiosClient.get('/orders');
        return response;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

/**
 * Get order by ID
 * @param {string} orderId 
 * @returns {Promise<Object>}
 */
export const getOrderById = async (orderId) => {
    try {
        const response = await axiosClient.get(`/orders/${orderId}`);
        return response;
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        throw error;
    }
}
