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
    
        const isSuccess = await handleLogin({ email, password, rememberMe }, rememberMe);
    
        if (isSuccess) {
            setSuccessMessage("Login successful!");
            setTimeout(() => navigate('/'), 2000);
        } else {
            setIsButtonLoading(false);
        }
    };    

    return (
        <div className="flex justify-center items-center mt-10 p-5">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Log in to Your Workshop</h2>
                    
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
                    <FormField
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        label={"Remember Me"}
                    />

                    <Button type="submit" disabled={isButtonLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
                        {isButtonLoading ? 'Logging in...' : 'Log in'}
                    </Button>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/account/register" className="text-blue-600 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
