import React from 'react';
import { FiX } from 'react-icons/fi';

const Filter = ({
    type,
    options,
    value,
    onChange,
    placeholder,
    className,
    defaultOptionLabel = "All",
    id,
    name,
    autocomplete = "on"
}) => {
    if (type === 'select') {
        return (
            <div className={className}>
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
            <div className={`relative ${className}`}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pr-8`}
                    id={id}
                    name={name}
                    autoComplete={autocomplete}
                />
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Clear input"
                    >
                        <FiX className="w-4 h-4 text-gray-500" />
                    </button>
                )}
            </div>
        );
    }

    return null;
};

export default Filter;
