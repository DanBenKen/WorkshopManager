const TextArea = ({ label, name, value, onChange, placeholder, required = false }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

export default TextArea;
