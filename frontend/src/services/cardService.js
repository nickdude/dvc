import axiosInstance from '../api/axiosInstance';

export const saveCard = async (cardData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axiosInstance.post('/cards', cardData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error saving card:', error);
        throw error;
    }
};

export const updateCard = async (cardId, cardData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axiosInstance.put(`/cards/${cardId}`, cardData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating card:', error);
        throw error;
    }
};

export const getMyCards = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axiosInstance.get('/cards/my', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
};

export const deleteCard = async (cardId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axiosInstance.delete(`/cards/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting card:', error);
        throw error;
    }
};

export const getCardById = async (cardId) => {
    try {
        const response = await axiosInstance.get(`/cards/${cardId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching card:', error);
        throw error;
    }
};