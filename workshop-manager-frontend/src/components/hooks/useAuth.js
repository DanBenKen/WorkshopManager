import { useState } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (loginData) => {
        setIsLoading(true);
        setAuthError(null);

        try {
            const response = await loginService(loginData);
            localStorage.setItem('authToken', response.token);
            navigate('/');
        } catch (error) {
            setAuthError(handleAuthError(error));
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (userData) => {
        setIsLoading(true);
        setAuthError(null);

        try {
            await registerService(userData);
        } catch (error) {
            setAuthError(handleAuthError(error));
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            await logoutService();
            localStorage.removeItem('authToken');
            navigate('/account/login');
        } catch (error) {
            setAuthError(handleAuthError(error));
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthError = (error) => {
        if (error?.response?.data?.errors) {
            return error.response.data.errors;
        }
        return error.response?.data || "An unknown error occurred";
    };

    return {
        handleLogin,
        handleRegister,
        handleLogout,
        authError,
        isLoading,
    };
};

export default useAuth;
