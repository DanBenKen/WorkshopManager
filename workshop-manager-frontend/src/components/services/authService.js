import axios from 'axios';

const API_URL = "http://localhost:5189/api/Account";

export const register = async (userData) => {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
};

export const login = async (loginData) => {
        const response = await axios.post(`${API_URL}/login`, loginData);
        return response.data;
};

export const logout = async () => {
    localStorage.removeItem('authToken');
    await axios.post(`${API_URL}/logout`); 
};
