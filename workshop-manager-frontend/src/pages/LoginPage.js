import React from 'react';
import LoginOrganism from '../components/organisms/LoginOrganism';
import AuthTemplate from '../components/templates/AuthTemplate';

const LoginPage = () => {
    const handleLoginSuccess = () => {
        console.log('Login successful, navigating...');
    };

    return (
        <AuthTemplate>
            <LoginOrganism onLoginSuccess={handleLoginSuccess} />
        </AuthTemplate>
    );
};

export default LoginPage;
