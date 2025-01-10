import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import ErrorMessage from '../atoms/ErrorMessage';

const FormField = ({ label, type, id, name, value, onChange, errorMessage, placeholder, options }) => {
    return (
        <div className="mb-4">
            <Label htmlFor={id}>{label}</Label>
            {type === 'select' ? (
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="border p-2 rounded w-full"
                >
                    {options && options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <Input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
            {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
    );
};

export default FormField;
