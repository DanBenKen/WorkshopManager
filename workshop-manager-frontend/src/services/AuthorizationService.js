import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5189/api/Account';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            return false;
        }
    }
    return true;
};

const setAuthHeader = () => {
    if (handleTokenExpiration()) {
        const token = localStorage.getItem('token');
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers['Authorization'];
    }
};

const register = async (registerData) => {
    try {
        const response = await api.post('/register', {
            username: registerData.userName,
            email: registerData.email,
            password: registerData.password,
            confirmPassword: registerData.confirmPassword,
        });
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            setAuthHeader();
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

const logout = async () => {
    try {
        await api.post('/logout');
        localStorage.removeItem('token');
        setAuthHeader();
        window.location.href = '/account/login';
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Logout failed');
    }
};

setAuthHeader();

const AuthorizationService = {
    register,
    login,
    logout,
};

export default AuthorizationService;
