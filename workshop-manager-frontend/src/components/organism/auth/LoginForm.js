import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import useValidation from '../../../hooks/useValidation';
import { validateLogin } from '../../../utils/validators';

const LoginForm = () => {
    const { handleLogin, authError } = useAuth();
    const [successMessage, setSuccessMessage] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const {
        values: { email, password },
        errors,
        handleChange,
        resetErrors,
        validateForm,
    } = useValidation({ email: '', password: '' }, validateLogin);

    const handleSubmit = async (event) => {
        event.preventDefault();
        resetErrors();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) return;
    
        setIsButtonLoading(true);
    
        const isSuccess = await handleLogin({ email, password }, rememberMe);
    
        if (isSuccess) {
            setSuccessMessage("Login successful!");
            setTimeout(() => navigate('/'), 2000);
        } else {
            setIsButtonLoading(false);
        }
    };    

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded space-y-4">
            {authError && <ErrorMessage message={authError} />}
            {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

            <FormField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                errorMessage={errors.email}
                required
            />
            <FormField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                errorMessage={errors.password}
                required
            />

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
            </div>

            <Button type="submit" disabled={isButtonLoading}>
                {isButtonLoading ? 'Logging in...' : 'Log in'}
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
