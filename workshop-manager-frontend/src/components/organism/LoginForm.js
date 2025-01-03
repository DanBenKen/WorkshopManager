import React, { useState } from 'react';
import { login } from '../services/authService';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';

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
            localStorage.setItem('authToken', response.token); // Čuvanje JWT tokena u localStorage
            setError('');
            navigate('/');
        } catch (err) {
            setError(err.message || "An error occurred");
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
                errorMessage={error}
            />
            <FormField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={error}
            />
            <Button type="submit">Login</Button>

            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginForm;
