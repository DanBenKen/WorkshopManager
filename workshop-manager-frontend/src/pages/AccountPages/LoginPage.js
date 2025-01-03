import React from 'react';
import LoginOrganism from '../../components/organisms/Login';
import AuthTemplate from '../../components/templates/AuthTemplate';

const LoginPage = () => {

    return (
        <AuthTemplate>
            <LoginOrganism />
        </AuthTemplate>
    );
};

export default LoginPage;
