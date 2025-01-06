import { useState, useEffect } from 'react';
import { createWorker, getWorkers, updateWorker, getWorkerById, deleteWorker } from '../services/workerService';
import { useNavigate } from 'react-router-dom';

const useWorkers = (workerId) => {
    const [workers, setWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchWorker = async () => {
            setIsLoading(true);
            try {
                const data = await getWorkerById(workerId);
                setWorkers(data)
            } catch (error) {
                setError('Failed to load worker details.');
            } finally {
                setIsLoading(false);
            }
        };

        if (workerId) {
            fetchWorker();
        }
    }, [workerId]);

    const handleCreateWorker = async (workerData) => {
        setIsLoading(true);
        setError('');

        if (!workerData.firstName || !workerData.lastName || !workerData.position) {
            setError('First Name, Last Name, and Position are required');
            setIsLoading(false);
            return;
        }

        try {
            await createWorker(workerData);
            navigate('/workers');
        } catch (error) {
            setError('Failed to create worker. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateWorker = async (id, workerData) => {
        setIsLoading(true);
        setError(null);

        if (!workerData.firstName || !workerData.lastName || !workerData.position) {
            setError('First Name, Last Name, and Position are required');
            setIsLoading(false);
            return;
        }

        try {
            await updateWorker(id, workerData);
            navigate('/workers');
        } catch (error) {
            console.error('Failed to update worker:', error);
            setError('Failed to update worker. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteWorker = async (id) => {
        setIsLoading(true);
        try {
            await deleteWorker(id);
            setWorkers((prevSupplies) => prevSupplies.filter(supply => supply.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        workers,
        isLoading,
        error,
        handleCreateWorker,
        handleUpdateWorker,
        handleDeleteWorker,
    };
};

export default useWorkers;
