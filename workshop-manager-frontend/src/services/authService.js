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
    await axiosInstance.post(`${API_ROUTES.ACCOUNT}/logout`);
};

export const setLocalToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const setSessionToken = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return token;
};

export const removeLocalToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const removeSessionToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const sessionToken = sessionStorage.getItem(TOKEN_KEY);

    if (!token) {
        if (!sessionToken) return false;
    }

    const tokenToCheck = token || sessionToken;

    const decodedToken = JSON.parse(atob(tokenToCheck.split('.')[1]));
    const expirationDate = decodedToken.exp * 1000;
    const currentDate = new Date().getTime();

    return currentDate < expirationDate;
};

export const handleAuthError = (error) => {
    if (!error.response) {
        return { message: ["Network error. Please check your internet connection."], code: 503 };
    }

    const { status, data } = error.response;

    const getErrorMessage = (status, data) => {
        switch (status) {
            case 400:
                if (data?.errors) {
                    return { message: Object.values(data.errors), code: status };
                }
                return { message: [data?.message || "Invalid input. Please check your details."], code: status };

            case 401:
                return { message: ["Invalid login attempt. Please check your credentials."], code: status };

            case 500:
                return { message: ["Server error. Please try again later."], code: status };

            default:
                return { message: ["An unknown error occurred. Please try again."], code: status };
        }
    };

    return getErrorMessage(status, data);
};
