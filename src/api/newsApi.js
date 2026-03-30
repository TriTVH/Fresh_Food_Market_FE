import axiosClient from './axiosClient';

/**
 * Fetch published news for guests
 * @returns {Promise<Object>}
 */
export const fetchPublishedNews = async () => {
    try {
        const response = await axiosClient.get('/news/GUEST');
        return response;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}

/**
 * Fetch news by ID
 * @param {number} newsId 
 * @returns {Promise<Object>}
 */
export const fetchNewsById = async (newsId) => {
    try {
        const response = await axiosClient.get(`/news/${newsId}`);
        return response;
    } catch (error) {
        console.error('Error fetching news detail:', error);
        throw error;
    }
}
