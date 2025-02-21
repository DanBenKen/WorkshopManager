import { useState } from 'react';
import { login as loginService, register as registerService, logout as logoutService, setToken, removeToken, handleAuthError } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAsyncAction = async (actionFunc) => {
        setIsLoading(true);
        setAuthError(null);
    
        try {
            await actionFunc();
            return true;
        } catch (error) {
            const { message } = handleAuthError(error); 
            setAuthError(message);
            return false;
        }
    };

    const handleLogin = async (loginData) => {
        return await handleAsyncAction(async () => {
            const response = await loginService(loginData);
            setToken(response.token);
        });
    };

    const handleRegister = async (userData) => {
        return await handleAsyncAction(async () => {
            await registerService(userData);
        });
    };

    const handleLogout = async () => {
        removeToken();
        await handleAsyncAction(async () => {
            await logoutService();
            navigate('/account/login');
        });
    };

    return {
        handleLogin,
        handleRegister,
        handleLogout,
        setIsLoading,
        authError,
        isLoading,
    };
};

export default useAuth;
