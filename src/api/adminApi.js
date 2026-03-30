import axiosClient from './axiosClient';

/**
 * ==================== BATCH (Inventory) ====================
 */

export const fetchBatches = async () => {
    try {
        const response = await axiosClient.get('/batch');
        return response;
    } catch (error) {
        console.error('Error fetching batches:', error);
        throw error;
    }
}

export const createBatch = async (batchData) => {
    try {
        const response = await axiosClient.post('/batch', batchData);
        return response;
    } catch (error) {
        console.error('Error creating batch:', error);
        throw error;
    }
}

/**
 * ==================== SUPPLIER ====================
 */

export const fetchSuppliers = async () => {
    try {
        const response = await axiosClient.get('/supplier/GUEST'); // Assuming GUEST endpoint if exists or check ocelot
        return response;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
}

/**
 * ==================== ORDERS (ADMIN) ====================
 */

export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        // Based on minimal API Program.cs, we have specific transitions
        if (newStatus === 'PACKAGING') {
            return await axiosClient.post(`/orders/${orderId}/move-to-packaging`);
        }
        // Add more transitions as backend develops
        return null;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}
