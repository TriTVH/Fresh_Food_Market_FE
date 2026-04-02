import axiosClient from './axiosClient';

/**
 * Place a new order
 * @param {Object} orderData - Contains userId, paymentMethod, paymentStatus, items 
 * @returns {Promise<Object>}
 */
export const placeOrder = async (orderData) => {
    try {
        const response = await axiosClient.post('/order', orderData);
        return response; // Minimal API returns the object directly, not wrapped in ApiResponse usually, but let's check
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
}

/**
 * Get orders for current logged-in user (by username from token)
 * Backend endpoint: GET /order/me
 * @returns {Promise<Object>}
 */
export const fetchUserOrders = async () => {
    try {
        const response = await axiosClient.get('/order/me');
        return response;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
}

/**
 * Get all orders (for Admin)
 * Backend endpoint: GET /order
 * @returns {Promise<Object>}
 */
export const getOrders = async () => {
    try {
        const response = await axiosClient.get('/order');
        return response;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

/**
 * Update order (confirm / delivery / complete / cancel)
 * @param {Object} payload - UpdateOrderModel body
 * @returns {Promise<Object>}
 */
export const updateOrder = async (payload) => {
    try {
        const response = await axiosClient.put('/order', payload);
        return response;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
}

/**
 * Hủy đơn hàng
 * DELETE /order — body: { orderId, cancelReason }
 */
export const cancelOrder = async ({ orderId, cancelReason }) => {
    try {
        const response = await axiosClient.delete('/order', {
            data: { orderId, cancelReason: cancelReason || '' },
        });
        return response;
    } catch (error) {
        console.error('Error cancelling order:', error);
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
