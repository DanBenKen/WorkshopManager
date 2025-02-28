import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ type, onClick, className, children, disabled }) => {
    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.75 }
    };

    return (
        <motion.button
            type={type}
            onClick={disabled ? undefined : onClick}
            className={`w-auto p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${disabled ? 'opacity-90' : ''} ${className}`}
            disabled={disabled}
            whileHover={buttonVariants?.hover}
            whileTap={buttonVariants?.tap}
        >
            {children}
        </motion.button>
    );
};

export default Button;
