import Input from '../atoms/Input';
import React from 'react';

const Filter = ({ type, options, value, onChange, placeholder }) => {
    if (type === 'select') {
        return (
            <div className="mb-4">
                <select value={value} onChange={(e) => onChange(e.target.value)} className="border p-2">
                    <option value="">All</option>
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
            <div className="mb-4 size-1/4">
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="border p-2"
                />
            </div>
        );
    }

    return null;
};

export default Filter;
