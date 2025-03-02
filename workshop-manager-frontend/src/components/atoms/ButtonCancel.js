import React from 'react';
import Button from './Button';

const ButtonCancel = ({ onClick, children, className, disabled, type }) => {
    return (
        <Button 
            type={type}
            onClick={disabled ? undefined : onClick}
            className={`bg-gray-500 hover:bg-gray-400 text-white ${disabled ? 'opacity-90' : ''} ${className}`} 
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export default ButtonCancel;
