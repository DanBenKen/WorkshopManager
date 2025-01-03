import React, { useState } from 'react';
import { register } from '../services/authService';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import ErrorMessage from '../atoms/ErrorMessage';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(["Passwords must match"]);
            return;
        }

        const userData = { username, email, password, confirmPassword };

        try {
            await register(userData);
            setSuccessMessage("Registration successful! Please log in.");
            setError([]);
            navigate('/account/login');
        } catch (err) {
            setError(Array.isArray(err) ? err : [err.message || "An unknown error occurred"]);
        }
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

            <Button type="submit">Register</Button>

            {error.length > 0 && error.map((errMsg, index) => (
                <ErrorMessage key={index} message={errMsg} />
            ))}
            
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
};

export default RegisterForm;
