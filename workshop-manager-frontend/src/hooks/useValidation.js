import { useState, useEffect, useRef } from 'react';

const useValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const prevInitialValues = useRef(initialValues);

  useEffect(() => {
    if (JSON.stringify(prevInitialValues.current) !== JSON.stringify(initialValues)) {
      setValues(initialValues);
      prevInitialValues.current = initialValues;
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setValues({
      ...values,
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
