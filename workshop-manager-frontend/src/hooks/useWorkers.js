import { useState, useEffect } from 'react';
import { createWorker, getWorkers, updateWorker, getWorkerById, deleteWorker } from '../services/workerService';

const useWorkers = (workerId) => {
    const [workers, setWorkers] = useState([]);
    const [worker, setWorker] = useState(null);
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

    useEffect(() => {
        if (workerId) {
            const fetchWorker = async () => {
                setIsLoading(true);
                try {
                    const data = await getWorkerById(workerId);
                    setWorker(data);
                } catch (error) {
                    setError('Failed to load worker details.');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchWorker();
        }
    }, [workerId]);

    const handleCreateWorker = async (workerData) => {
        setIsLoading(true);
        setError('');

        try {
            await createWorker(workerData);
        } catch (error) {
            setError('Failed to create worker. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateWorker = async (id, workerData) => {
        setIsLoading(true);
        setError(null);

        try {
            await updateWorker(id, workerData);
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
            setWorkers((prevWorkers) => prevWorkers.filter(worker => worker.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        workers,
        worker,
        isLoading,
        error,
        handleCreateWorker,
        handleUpdateWorker,
        handleDeleteWorker,
    };
};

export default useWorkers;
