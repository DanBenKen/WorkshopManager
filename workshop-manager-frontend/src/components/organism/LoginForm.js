import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import ErrorMessage from '../atoms/ErrorMessage';

const LoginForm = () => {
    const { handleLogin, authError, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password });
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

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
            </Button>

            {authError && <ErrorMessage message={authError} />}
        </form>
    );
};

export default LoginForm;
