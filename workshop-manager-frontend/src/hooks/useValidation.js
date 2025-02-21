import { useState } from 'react';

const useValidation = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({ ...values,
            [e.target.name]: e.target.value,
        });
    };

    const resetErrors = () => setErrors({});

    const validateForm = () => {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        return validationErrors;
    };

    return {
        values,
        errors,
        handleChange,
        resetErrors,
        validateForm,
    };
};

export default useValidation;
