import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import ErrorMessage from '../atoms/ErrorMessage';

const FormField = ({ label, type, name, value, onChange, errorMessage, placeholder }) => {
    return (
        <div className="mb-4">
            <Label htmlFor={name}>{label}</Label>
            <Input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {errorMessage && ( ErrorMessage ({errorMessage}) )}
        </div>
    );
};

export default FormField;
