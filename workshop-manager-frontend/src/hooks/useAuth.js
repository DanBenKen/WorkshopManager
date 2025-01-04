import { useState } from 'react';
import { login as loginService, register as registerService, logout as logoutService, setToken, handleAuthError } from '../services/authService';
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
            setToken(response.token); // Spremi token
            navigate('/'); // Preusmeravanje na početnu stranicu
        } catch (error) {
            setAuthError(handleAuthError(error)); // Postavljanje greške
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
            navigate('/'); // Usmerenje nakon registracije
        } catch (error) {
            setAuthError(handleAuthError(error)); // Postavljanje greške
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            await logoutService();
            navigate('/account/login'); // Preusmeravanje na login stranicu
        } catch (error) {
            setAuthError(handleAuthError(error)); // Postavljanje greške
            throw error;
        } finally {
            setIsLoading(false);
        }
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
