import React, { useState } from 'react';
import { login } from '../services/authService';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import ErrorMessage from '../atoms/ErrorMessage';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { email, password };

        try {
            const response = await login(loginData);
            localStorage.setItem('authToken', response.token);
            setError('');
            navigate('/');
        } catch (err) {
            setError(err.message || "Invalid Login Attempt");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit">Login</Button>

            {error && <ErrorMessage message={error} />}
        </form>
    );
};

export default LoginForm;
