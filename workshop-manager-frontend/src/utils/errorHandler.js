const handleError = (err) => {
    if (err.response) {
        if (err.response.data.errors) {
            return err.response.data.errors;
        }
        return ['An error occurred. Please try again.'];
    }
    return ['Unexpected error occurred.'];
};

export default handleError;
