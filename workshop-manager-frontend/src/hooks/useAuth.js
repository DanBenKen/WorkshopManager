import { useState, useEffect } from 'react';
import AuthService from '../services/AuthorizationService';

class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
    }
}

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await AuthService.login(credentials);
            if (userData && userData.token) {
                setUser(userData);
            } else {
                throw new AuthError('No token received');
            }
        } catch (err) {
            setError(err instanceof AuthError ? err.message : 'Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await AuthService.logout();
            setUser(null);
        } catch (err) {
            setError(`Logout failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const register = async (registerData) => {
        try {
            const response = await AuthService.register(registerData);
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (user) {
            // Perform actions on successful login (e.g., navigate)
        }
    }, [user]);

    return { login, logout, register, loading, error, user };
};

export default useAuth;
