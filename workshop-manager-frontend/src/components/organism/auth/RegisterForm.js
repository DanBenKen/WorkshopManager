import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import useValidation from '../../../hooks/useValidation';
import { validateRegistration } from '../../../utils/validators';

const RegisterForm = () => {
    const { handleRegister, authError } = useAuth();
    const [successMessage, setSuccessMessage] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const navigate = useNavigate();

    const {
        values: { username, email, password, confirmPassword },
        errors,
        handleChange,
        resetErrors,
        validateForm,
    } = useValidation({ username: '', email: '', password: '', confirmPassword: '' }, validateRegistration);

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();
    
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) return;
    
        setIsButtonLoading(true);
    
        const success = await handleRegister({
            username,
            email,
            password,
            confirmPassword
        });
    
        if (success) {
            setSuccessMessage("Registration successful!");
            setTimeout(() => navigate('/account/login'), 1000);
        } else {
            setIsButtonLoading(false);
        }
    };    

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded space-y-4">
            {authError && <ErrorMessage message={authError} />}
            {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

            <FormField
                label="Username"
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                errorMessage={errors.username}
                required
            />
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
            <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                errorMessage={errors.confirmPassword}
                required
            />

            <Button type="submit" disabled={isButtonLoading}>
                {isButtonLoading ? 'Registering...' : 'Register'}
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
