import React from 'react';
import LoginForm from '../../components/organism/LoginForm';
import AuthPageLayout from '../../components/layouts/AuthPageLayout';

const LoginPage = () => {
    return (
        <AuthPageLayout title="Login to WorkshopManager">
            <LoginForm />
        </AuthPageLayout>
    );
};

export default LoginPage;
