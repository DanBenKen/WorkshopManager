import React from 'react';
import AuthService from '../services/AuthService';

const LogoutButton = () => {

    return (
        <button
            onClick={AuthService.logout}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            aria-label="Logout"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
