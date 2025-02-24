import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../services/authService';

const PrivateRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/account/login');
        }
    });

    return <Outlet />;
};

export default PrivateRoute;
