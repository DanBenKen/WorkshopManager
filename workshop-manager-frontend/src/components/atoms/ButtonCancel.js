import React from 'react';
import Button from './Button';

const ButtonCancel = ({ onClick, children, className }) => {
    return (
        <Button onClick={onClick} className={`bg-gray-500 hover:bg-gray-400 ${className}`}>
            {children}
        </Button>
    );
};

export default ButtonCancel;
