import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';

const LoginForm = () => {
    const { handleLogin, authError, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await handleLogin({ email, password });

        if (success) {
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded space-y-4">
            {authError && <ErrorMessage message={authError} />}

            <FormField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <FormField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
            </Button>

            <div className="mt-4 text-center">
                <p className="text-sm md:text-base">
                    Don't have an account?{' '}
                    <Link to="/account/register" className="text-blue-600 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
