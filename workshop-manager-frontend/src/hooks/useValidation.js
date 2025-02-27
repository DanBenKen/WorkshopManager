import { useState, useEffect, useRef } from 'react';

// Custom hook for form validation
const useValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  // Ref to store the previous initial values for comparison
  const prevInitialValues = useRef(initialValues);

  // Effect hook to update form values when initialValues change
  useEffect(() => {
    // Check if initial values have changed by directly comparing properties
    if (Object.keys(initialValues).some(key => initialValues[key] !== prevInitialValues.current[key])) {
      setValues(initialValues);
      prevInitialValues.current = initialValues; // Update the reference to the latest initial values
    }
  }, [initialValues]);  

  // Handle change in input fields and update the values state
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Reset the errors state to an empty object
  const resetErrors = () => setErrors({});

  // Validate the form values by passing them to the provided validate function
  const validateForm = () => {
    const validationErrors = validate(values); // Validate and get errors
    setErrors(validationErrors);
    return validationErrors;
  };

  // Return values, errors, and methods to manage form state and validation
  return {
    values, errors,
    handleChange, resetErrors, validateForm,
  };
};

export default useValidation;
