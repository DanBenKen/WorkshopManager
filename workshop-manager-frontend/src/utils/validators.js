const isRequired = (value, fieldName) => value ? undefined : `${fieldName} is required.`;
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
