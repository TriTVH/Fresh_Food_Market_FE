import axiosClient from './axiosClient';

/**
 * Fetch all vouchers for user
 * @returns {Promise<Object>}
 */
export const fetchVouchers = async () => {
    try {
        const response = await axiosClient.get('/voucher');
        return response;
    } catch (error) {
        console.error('Error fetching vouchers:', error);
        throw error;
    }
}

/**
 * Get voucher by ID
 * @param {number} voucherId 
 * @returns {Promise<Object>}
 */
export const fetchVoucherById = async (voucherId) => {
    try {
        const response = await axiosClient.get(`/voucher/${voucherId}`);
        return response;
    } catch (error) {
        console.error('Error fetching voucher detail:', error);
        throw error;
    }
}
