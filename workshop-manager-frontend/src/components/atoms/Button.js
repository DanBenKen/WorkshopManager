import React from 'react';

const Button = ({ type, onClick, className, children, disabled }) => {
    return (
        <button
            type={type}
            onClick={disabled ? undefined : onClick}
            className={`w-auto p-2 text-white bg-blue-500 rounded-md 
                hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-1 shadow-lg ${disabled ? 'opacity-90 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
