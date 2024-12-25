import { useState } from 'react';

const useMessages = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    return {
        successMessage,
        errorMessages,
        setSuccessMessage,
        setErrorMessages,
    };
};

export default useMessages;
