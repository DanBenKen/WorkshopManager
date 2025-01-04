import { useState, useEffect } from 'react';
import { getWorkers } from '../services/workerService';

const useWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getWorkers();
                setWorkers(data);
            } catch (error) {
                console.error("Error fetching workers:", error);
                setError("Failed to load workers. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    return {
        workers,
        isLoading,
        error,
    };
};

export default useWorkers;
