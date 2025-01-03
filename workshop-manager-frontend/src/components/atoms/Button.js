import React from 'react';

const Button = ({ type, onClick, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shadow-lg"
        >
            {children}
        </button>
    );
};

export default Button;
