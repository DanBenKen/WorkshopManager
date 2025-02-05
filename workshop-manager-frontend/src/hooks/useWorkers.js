import { useState, useEffect } from 'react';
import { createWorker, getWorkers, updateWorker, getWorkerById, deleteWorker, getWorkersWithJobs, getWorkersCount, getUnemployedWorkersCount, getWorkersWithoutJobs } from '../services/workerService';

const useWorkers = (workerId, fetchType = 'all') => {
    const [workers, setWorkers] = useState([]);
    const [worker, setWorker] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [counts, setCounts] = useState({ total: 0, unemployed: 0 });

    const handleAsyncAction = async (actionFunc, actionName, successCallback = () => {}) => {
        setIsLoading(true);
        setError('');
        try {
            await actionFunc();
            successCallback();
        } catch (error) {
            setError(`Failed to ${actionName}. Please try again later.`);
        } finally {
            setIsLoading(false);
        }
    };

    const getErrorMessage = (actionType) => {
        switch(actionType) {
            case 'fetch': return "Failed to fetch data. Please try again later.";
            case 'create': return "Failed to create worker. Please try again later.";
            case 'update': return "Failed to update worker. Please try again later.";
            case 'delete': return "Failed to delete worker. Please try again later.";
            default: return "An unexpected error occurred.";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (workerId) {
                    const data = await getWorkerById(workerId);
                    setWorker(data);
                } else {
                    let data;
                    switch(fetchType) {
                        case 'withJobs':
                            data = await getWorkersWithJobs();
                            break;
                        case 'withoutJobs':
                            data = await getWorkersWithoutJobs();
                            break;
                        case 'all':
                            data = await getWorkers();
                            break;
                        case 'count':
                            const countData = await getWorkersCount();
                            setCounts(prev => ({ ...prev, total: countData }));
                            return;
                        case 'unemployedCount':
                            const unemployedData = await getUnemployedWorkersCount();
                            setCounts(prev => ({ ...prev, unemployed: unemployedData }));
                            return;
                        default:
                            break;
                    }
    
                    const workersWithFullName = data.map((worker) => ({
                        ...worker,
                        fullName: `${worker.firstName} ${worker.lastName}`,
                    }));
    
                    setWorkers(workersWithFullName);
                }
            } catch (error) {
                setError(getErrorMessage('fetch'));
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [fetchType, workerId]);    

    const handleCreateWorker = async (workerData) => {
        await handleAsyncAction(() => createWorker(workerData), 'create worker');
    };

    const handleUpdateWorker = async (id, workerData) => {
        await handleAsyncAction(() => updateWorker(id, workerData), 'update worker');
    };

    const handleDeleteWorker = async (id) => {
        await handleAsyncAction(async () => {
            await deleteWorker(id);
            setWorkers((prevWorkers) => prevWorkers.filter(worker => worker.id !== id));
        }, 'delete worker');
    };

    return {
        workers,
        worker,
        isLoading,
        error,
        counts,
        handleCreateWorker,
        handleUpdateWorker,
        handleDeleteWorker,
    };
};

export default useWorkers;
