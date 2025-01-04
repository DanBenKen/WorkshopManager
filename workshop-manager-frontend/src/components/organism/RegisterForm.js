import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth'; // Koristi useAuth
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import ErrorMessage from '../atoms/ErrorMessage';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { handleRegister, authError, isLoading } = useAuth();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setSuccessMessage('');
            return;
        }

        const userData = { username, email, password, confirmPassword };

        await handleRegister(userData);
        setSuccessMessage("Registration successful! Please log in.");
        navigate('/account/login');
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </Button>

            {authError && <ErrorMessage message={authError} />}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    );
};

export default RegisterForm;
