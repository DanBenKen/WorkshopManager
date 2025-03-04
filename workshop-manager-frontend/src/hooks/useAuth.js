import { useState } from 'react';
import { login as loginService, register as registerService, logout as logoutService, setLocalToken, removeLocalToken, setSessionToken, removeSessionToken } from '../services/authService';

const useAuth = () => {
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAuthError = (error) => {
        if (!error.response) {
            return { general: ["Network error. Please check your internet connection."] };
        }

        const { status, data } = error.response;
        const errors = {};

        switch (status) {
            case 400:
                if (Array.isArray(data?.errors)) {
                    data.errors.forEach((errorMsg) => {
                        const lowerMsg = errorMsg.toLowerCase();
                        if (lowerMsg.includes('username')) errors.username = errorMsg;
                        if (lowerMsg.includes('email')) errors.email = errorMsg;
                        if (lowerMsg.includes('password')) errors.password = errorMsg;
                    });
                }
                break;
            case 401:
                errors.general = ["Invalid credentials. Please try again."];
                break;
            case 500:
                errors.general = ["Server error. Please try again later."];
                break;
            default:
                errors.general = ["An unknown error occurred. Please try again."];
        }

        return errors;
    };

    const handleAsyncAction = async (action) => {
        setIsLoading(true);
        setAuthError(null);
    
        try {
            await action();
            return { success: true };
        } catch (error) {
            const errors = handleAuthError(error);
            setAuthError(errors);
            return { success: false, errors };
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (credentials, rememberMe) => {
        return handleAsyncAction(async () => {
            removeSessionToken();
            removeLocalToken();

            const response = await loginService(credentials);
            const storage = rememberMe ? setLocalToken : setSessionToken;
            storage(response.token);

            setAuthError(null);
        });
    };

    const handleRegister = async (userData) => {
        return handleAsyncAction(async () => {
            await registerService(userData);
        });
    };

    const handleLogout = async () => {
        return handleAsyncAction(async () => {
            removeLocalToken();
            removeSessionToken();
            await logoutService();
        });
    };

    return { authError, isLoading, handleLogin, handleRegister, handleLogout, setAuthError };
};

export default useAuth;
