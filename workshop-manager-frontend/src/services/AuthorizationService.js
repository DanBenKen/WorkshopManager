import axios from 'axios';

const API_URL = 'http://localhost:5189/api/Account';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers['Authorization'];
    }
};

const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Registration failed');
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
        window.location.href = '/login';
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
