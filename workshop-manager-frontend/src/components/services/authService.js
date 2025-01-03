import axios from 'axios';

const API_URL = "http://localhost:5189/api/Account";

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw handleAuthError(error);
    }
};

export const login = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, loginData);
        return response.data;
    } catch (error) {
        throw handleAuthError(error);
    }
};

const handleAuthError = (error) => {
    if (error?.response?.data?.errors) {
        return error.response.data.errors;
    }
    return error.response?.data || "An unknown error occurred";
};
