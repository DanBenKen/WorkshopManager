import axiosInstance from './axiosInstance';
import { API_ROUTES } from '../config/apiConfig';

const TOKEN_KEY = 'authToken';

export const register = async (userData) => {
    const response = await axiosInstance.post(`${API_ROUTES.ACCOUNT}/register`, userData);
    return response.data;
};

export const login = async (loginData) => {
    const response = await axiosInstance.post(`${API_ROUTES.ACCOUNT}/login`, loginData);
    return response.data;
};

export const logout = async () => {
    removeToken();
    await axiosInstance.post(`${API_ROUTES.ACCOUNT}/logout`);
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
    if (error.response?.status === 500) {
        return ["Invalid Attempt. Please check your credentials."];
    }

    if (error.response?.data?.errors) {
        return Object.values(error.response.data.errors).flat();
    }

    if (error.response?.data?.message) {
        return [error.response.data.message];
    }

    return ["An unknown error occurred."];
};
