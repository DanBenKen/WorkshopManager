import React from 'react';

const Button = ({ type, onClick, children }) => {
    return (
        <button type={type} onClick={onClick} className="btn">
            {children}
        </button>
    );
};

export default Button;
