import axios from 'axios';

const API_URL = "http://localhost:5189/api/Account";
const TOKEN_KEY = 'authToken';

export const register = async (userData) => {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
};

export const login = async (loginData) => {
        const response = await axios.post(`${API_URL}/login`, loginData);
        return response.data;
};

export const logout = async () => {
    removeToken();
    await axios.post(`${API_URL}/logout`); 
};

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const handleAuthError = (error) => {
    if (error?.response?.data?.errors) {
        return error.response.data.errors;
    }
    return error.response?.data || "An unknown error occurred";
};
