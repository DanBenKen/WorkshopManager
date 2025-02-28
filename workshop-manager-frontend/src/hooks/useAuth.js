import { useState } from 'react';
import { login as loginService, register as registerService, logout as logoutService, setLocalToken, removeLocalToken, handleAuthError, setSessionToken, removeSessionToken } from '../services/authService';

const useAuth = () => {
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // handleAsyncAction wraps async operations to uniformly manage loading state and error handling.
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
        } finally {
            setIsLoading(false);
        }
    };

    // Attempts to log in the user with provided credentials. On success, it stores the received authentication token.
    const handleLogin = async (loginData, rememberMe) => {
        return await handleAsyncAction(async () => {
            removeSessionToken();
            removeLocalToken();
            const response = await loginService(loginData);

            rememberMe ? setLocalToken(response.token) : setSessionToken(response.token);
        });
    };

    // Attempts to register a new user with the provided userData.
    const handleRegister = async (userData) => {
        return await handleAsyncAction(async () => {
            await registerService(userData);
        });
    };

    // Logs out the user by removing the token and calling the logout service.
    const handleLogout = async () => {
        removeLocalToken();
        removeSessionToken();

        await handleAsyncAction(async () => {
            await logoutService();
        });
    };

    return {
        authError, isLoading,
        handleLogin, handleRegister, handleLogout, setIsLoading,
    };
};

export default useAuth;
