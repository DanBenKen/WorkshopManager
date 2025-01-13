import React from 'react';
import Button from './Button';

const ButtonDelete = ({ onClick, children, className }) => {
    return (
        <Button onClick={onClick} className={`bg-red-500 hover:bg-red-600 text-white ${className}`}>
            {children}
        </Button>
    );
};

export default ButtonDelete;
