const SelectField = ({ label, name, value, onChange, options }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SelectField;
