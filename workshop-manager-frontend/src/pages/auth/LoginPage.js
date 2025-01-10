import React from 'react';
import AuthPageLayout from '../../layouts/FormPageLayout';
import LoginForm from '../../components/organism/auth/LoginForm';

const LoginPage = () => {
    return (
        <AuthPageLayout title="Login to WorkshopManager">
            <LoginForm />
        </AuthPageLayout>
    );
};

export default LoginPage;
