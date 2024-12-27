import React, { useEffect } from 'react';
import LoginForm from '../molecules/AccountMolecules/LoginForm';
import useAuth from '../../hooks/useAuth';
import useMessages from '../../hooks/useMessages';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../containers/FormContainer';

const LoginOrganism = () => {
    const { login, loading, error, user } = useAuth();
    const { successMessage, errorMessages, setSuccessMessage, setErrorMessages } = useMessages();
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        setErrorMessages([]);
        setSuccessMessage('');
        try {
            await login(credentials);
        } catch (err) {
            setErrorMessages([err.message || 'An unexpected error occurred.']);
        }
    };

    useEffect(() => {
        if (user) {
            setSuccessMessage('Login successful!');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [user, error, navigate, setErrorMessages, setSuccessMessage]);

    return (
        <FormContainer
            title="Login"
            successMessage={successMessage}
            errorMessages={errorMessages}
        >
            <LoginForm
                onLogin={handleLogin}
                isSubmitting={loading}
                error={errorMessages.length > 0 ? errorMessages[0] : ''}
            />
        </FormContainer>
    );
};

export default LoginOrganism;
