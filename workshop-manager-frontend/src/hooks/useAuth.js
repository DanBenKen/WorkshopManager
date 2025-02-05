import { useState } from 'react';
import { login as loginService, register as registerService, logout as logoutService, setToken, handleAuthError } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAsyncAction = async (actionFunc, actionName, successCallback = () => {}) => {
        setIsLoading(true);
        setAuthError(null);

        try {
            await actionFunc();
            successCallback();
            return true;
        } catch (error) {
            setAuthError(handleAuthError(error, actionName));
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (loginData) => {
        return await handleAsyncAction(async () => {
            const response = await loginService(loginData);
            setToken(response.token);
        }, 'login');
    };

    const handleRegister = async (userData) => {
        return await handleAsyncAction(async () => {
            await registerService(userData);
        }, 'register');
    };

    const handleLogout = async () => {
        return await handleAsyncAction(async () => {
            await logoutService();
            navigate('/account/login');
        }, 'logout');
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
