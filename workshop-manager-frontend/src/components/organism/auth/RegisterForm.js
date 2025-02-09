import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Button from '../../atoms/Button';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../../molecules/FormField';
import ErrorMessage from '../../atoms/ErrorMessage';

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

        const success = await handleRegister(userData);

        if (success) {
            setSuccessMessage("Registration successful! Please log in.");
            setTimeout(() => navigate('/account/login'), 2000);
        } else {
            setSuccessMessage("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-6 bg-white rounded space-y-4"
        >
            {authError && <ErrorMessage message={authError} />}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

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
            {password && confirmPassword && password !== confirmPassword && (
                <ErrorMessage message="Passwords do not match." />
            )}

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </Button>

            <div className="mt-4 text-center">
                <p className="text-sm md:text-base">
                    Already have an account?{' '}
                    <Link to="/account/login" className="text-blue-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;
