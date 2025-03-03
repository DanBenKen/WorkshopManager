import React from 'react';
import Label from '../atoms/Label';
import ErrorMessage from '../atoms/ErrorMessage';

const FormField = ({ label, type, id, name, value, onChange, errorMessage, placeholder, options, checked, autoComplete }) => {
    return (
        <div className={`w-full ${type === 'checkbox' ? 'flex items-center space-x-2' : ''}`}>
            {type === 'checkbox' ? (
                <div className="flex items-center space-x-2">
                    <input
                        id={id}
                        type="checkbox"
                        name={name}
                        checked={checked}
                        onChange={onChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <Label htmlFor={id} className="text-sm">{label}</Label>
                </div>
            ) : type === 'select' ? (
                <>
                    <Label htmlFor={id}>{label}</Label>
                    <select
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="border p-2 rounded w-full"
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </>
            ) : (
                <>
                    <Label htmlFor={id}>{label}</Label>
                    <input
                        id={id}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        autoComplete={autoComplete}
                    />
                </>
            )}
            {<ErrorMessage message={errorMessage} />}
        </div>
    );
};

export default FormField;
