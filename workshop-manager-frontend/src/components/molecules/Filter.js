import React from 'react';

const Filter = ({ type, options, value, onChange, placeholder, className, defaultOptionLabel = "All", id, name, autocomplete = "on" }) => {
    if (type === 'select') {
        return (
            <div className={`${className}`}>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="border p-2"
                    id={id}
                    name={name}
                    autoComplete={autocomplete}
                >
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
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${className}`}
                    id={id}
                    name={name}
                    autoComplete={autocomplete}
                />
            </div>
        );
    }

    return null;
};

export default Filter;
