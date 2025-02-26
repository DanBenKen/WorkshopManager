import Input from '../atoms/Input';
import React from 'react';

const Filter = ({ type, options, value, onChange, placeholder, className, defaultOptionLabel = "All" }) => {
    if (type === 'select') {
        return (
            <div className={`${className}`}>
                <select value={value} onChange={(e) => onChange(e.target.value)} className="border p-2">
                    <option value="">{defaultOptionLabel}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === 'input') {
        return (
            <div className={`${className}`}>
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`border p-2 ${className}`}
                />
            </div>
        );
    }

    return null;
};

export default Filter;
