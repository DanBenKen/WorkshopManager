import { useState } from 'react';
import AuthService from '../services/AuthorizationService';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await AuthService.login(credentials);
            setUser(userData);
        } catch (err) {
            setError('Login failed: ' + err.message);
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
            setError('Logout failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (registerData) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await AuthService.register(registerData);
            setUser(newUser);
        } catch (err) {
            setError('Registration failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, logout, register, loading, error, user };
};

export default useAuth;
