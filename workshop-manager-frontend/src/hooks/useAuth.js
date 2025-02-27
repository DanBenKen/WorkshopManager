import { useState } from 'react';
import { login as loginService, register as registerService, logout as logoutService, setToken, removeToken, handleAuthError } from '../services/authService';

const useAuth = () => {
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // handleAsyncAction wraps async operations to uniformly manage loading state and error handling.
    const handleAsyncAction = async (actionFunc) => {
        setIsLoading(true);
        setAuthError(null);

        try {
            await actionFunc();  // Execute the provided async function.
            return true;
        } catch (error) {
            const { message } = handleAuthError(error);  // Process error using auth-specific handler.
            setAuthError(message);
            return false;
        } finally {
            setIsLoading(false);  // Reset the loading state after the async operation completes.
        }
    };

    // Attempts to log in the user with provided credentials. On success, it stores the received authentication token.
    const handleLogin = async (loginData) => {
        return await handleAsyncAction(async () => {
            const response = await loginService(loginData);  // Call the login service with loginData.
            setToken(response.token);  // Store the authentication token.
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
        removeToken();
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
