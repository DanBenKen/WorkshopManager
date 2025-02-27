import React from 'react';
import Button from './Button';

const ButtonDelete = ({ onClick, children, className, isButtonLoading }) => {
    return (
        <Button
            onClick={isButtonLoading ? undefined : onClick}
            className={`bg-red-500 hover:bg-red-600 text-white ${className} ${isButtonLoading ? 'opacity-90 cursor-not-allowed' : ''}`}
            disabled={isButtonLoading}
        >
            {isButtonLoading ? "Deleting..." : children}
        </Button>
    );
};

export default ButtonDelete;
