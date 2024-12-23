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
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`);
        localStorage.removeItem('token');
        window.location.href = '/login';
    } catch (error) {
        throw new Error('Logout failed');
    }
};

const AuthService = {
    register,
    login,
    logout,
    setAuthHeader,
};

export default AuthService;