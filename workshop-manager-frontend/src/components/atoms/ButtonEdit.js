import React from 'react';
import Button from './Button';

const ButtonEdit = ({ onClick, children, className }) => {
    return (
        <Button onClick={onClick} className={`bg-yellow-500 hover:bg-yellow-400 ${className}`}>
            {children}
        </Button>
    );
};

export default ButtonEdit;
