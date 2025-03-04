import { useState, useEffect, useRef, useCallback } from 'react';

const useValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const prevInitialValues = useRef(initialValues);

  useEffect(() => {
    if (Object.keys(initialValues).some(key => initialValues[key] !== prevInitialValues.current[key])) {
      setValues(initialValues);
      prevInitialValues.current = initialValues;
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetErrors = () => setErrors({});

  const validateForm = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return validationErrors;
  };

  const resetValues = useCallback((newValues) => {
    setValues(newValues);
  }, [setValues]);

  return { values, errors, handleChange, resetErrors, validateForm, resetValues };
};

export default useValidation;
