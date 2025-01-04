import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import ErrorMessage from '../atoms/ErrorMessage';

const FormField = ({ label, type, id, name, value, onChange, errorMessage, placeholder }) => {
    return (
        <div className="mb-4">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
    );
};

export default FormField;
