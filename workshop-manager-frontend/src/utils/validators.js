const isRequired = (value, fieldName) => value ? undefined : `${fieldName} is required.`;

// Account validation
const minLength = (value, length, fieldName) => value.length >= length ? undefined : `${fieldName} must be at least ${length} characters long.`;
const isEmail = (value) => /\S+@\S+\.\S+/.test(value) ? undefined : "Email address is invalid.";
const hasNumber = (value) => /[0-9]/.test(value) ? undefined : "Password must contain at least one number.";
const hasLowercase = (value) => /[a-z]/.test(value) ? undefined : "Password must contain at least one lowercase letter.";
const hasUppercase = (value) => /[A-Z]/.test(value) ? undefined : "Password must contain at least one uppercase letter.";
const passwordsMatch = (password, confirmPassword) => password === confirmPassword ? undefined : "Passwords do not match.";

export const validateRegistration = (values) => {
    const errors = {};

    errors.username = isRequired(values.username, "Username");
    errors.email = isRequired(values.email, "Email") || isEmail(values.email);
    errors.password = isRequired(values.password, "Password") 
                     || minLength(values.password, 6, "Password")
                     || hasNumber(values.password)
                     || hasLowercase(values.password)
                     || hasUppercase(values.password);
    errors.confirmPassword = isRequired(values.confirmPassword, "Confirm Password") || passwordsMatch(values.password, values.confirmPassword);

    Object.keys(errors).forEach(key => errors[key] === undefined && delete errors[key]);

    return errors;
};

export const validateLogin = (values) => {
    const errors = {};

    errors.email = isRequired(values.email, "Email");
    errors.password = isRequired(values.password, "Password");

    Object.keys(errors).forEach(key => errors[key] === undefined && delete errors[key]);

    return errors;
};

// Job validation
const isNumber = (value, fieldName) => !isNaN(value) ? undefined : `${fieldName} must be a valid number.`;

export const validateJobForm = (values) => {
    const errors = {};
    
    errors.jobName = isRequired(values.jobName, 'Job Name');
    errors.description = isRequired(values.description, 'Description');
    errors.workerId = isRequired(values.workerId, 'Worker ID');
    errors.supplyId = isRequired(values.supplyId, 'Supply ID');
    errors.quantity = values.supplyId && !values.quantity ? 'Quantity is required if Supply ID is provided.' : undefined;
    errors.quantity = errors.quantity || isNumber(values.quantity, 'Quantity');
    
    return errors;
};

// Supply validation
const isPositiveNumber = (value, fieldName) => value > 0 ? undefined : `${fieldName} must be a positive number.`;

export const validateSupplyForm = (values) => {
    const errors = {};

    errors.name = isRequired(values.name, 'Supply Name');
    errors.quantity = isRequired(values.quantity, 'Quantity') || isPositiveNumber(values.quantity, 'Quantity');
    errors.type = isRequired(values.type, 'Supply Type');
    Object.keys(errors).forEach(key => errors[key] === undefined && delete errors[key]);

    return errors;
};

// Worker validation
export const validateWorkerForm = (values) => {
    const errors = {};

    errors.firstName = isRequired(values.firstName, 'First Name');
    errors.lastName = isRequired(values.lastName, 'Last Name');    
    errors.position = isRequired(values.position, 'Position');
    Object.keys(errors).forEach((key) => errors[key] === undefined && delete errors[key]);

    return errors;
};
