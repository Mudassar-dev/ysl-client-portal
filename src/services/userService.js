import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    // timeout: 10000,
    // headers: { 'Content-Type': 'application/json' }
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',  // Add this line
    },
});

export const getClientJourny = async (clientName) => {
    try {
        const response = await api.get(`/api/getClientJournyStage/${clientName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getAssetsByName = async (clientName) => {
    try {
        const response = await api.get(`/api/googleDriveAssets/${clientName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getAssetsFileById = async (fileId) => {
    try {
        const response = await api.get(`/api/googleDriveGetFileById/${fileId}`, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getCleintAtsData = async (clientName) => {
    try {
        const response = await api.get(`/api/getCleintAtsData/${clientName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getCandidateProfile = async (CandidateId) => {
    try {
        const response = await api.get(`/api/getCandidateProfile/${CandidateId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getCleintBillingDetails = async (clientName) => {
    try {
        const response = await api.get(`/api/customerBillingDetail/${clientName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const saveClientGoogoleAuth = async (reqBody) => {
    try {
        const response = await api.post('/api/saveClientGoogleAuth', reqBody);
        return response.data;
    } catch (error) {
        console.error('Error Save Client Googole Auth:', error);
        throw error;
    }
};

export const getClientAuthlist = async (payload) => {
    try {
        const response = await api.post('/api/getClientAuthlist', payload);
        return response.data;
    } catch (error) {
        console.error('Error Save Client Googole Auth:', error);
        throw error;
    }
};


export const fetchCalanderEvents = async (payload) => {
    try {
        const response = await api.post('/api/fetchCalanderEvents', payload);
        return response.data;
    } catch (error) {
        console.error('Error Save Client Googole Auth:', error);
        throw error;
    }
};

export const addCalanderEvent = async (payload) => {
    try {
        const response = await api.post('/api/addCalanderEvent', payload);
        return response.data;
    } catch (error) {
        console.error('Error Save Client Googole Auth:', error);
        throw error;
    }
};


// Create a new user
export const createUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Update user by ID
export const updateUserById = async (userId, userData) => {
    try {
        const response = await api.put(`/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Delete user by ID
export const deleteUserById = async (userId) => {
    try {
        await api.delete(`/users/${userId}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
