import { useState, useEffect, useCallback } from 'react';
import { 
  createWorker, 
  getWorkers, 
  updateWorker, 
  getWorkerById, 
  deleteWorker, 
  getWorkersWithJobs, 
  getWorkersCount, 
  getUnemployedWorkersCount, 
  getWorkersWithoutJobs 
} from '../services/workerService';

const enhanceWorkerData = (workerData) => ({
    ...workerData,
    fullName: `${workerData.firstName} ${workerData.lastName}`
});

const useWorkers = (workerId, fetchType = 'all') => {
    const [workers, setWorkers] = useState([]);
    const [worker, setWorker] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [counts, setCounts] = useState({ total: 0, unemployed: 0 });

    const handleError = useCallback((error) => {
        setError(error.message || 'An error occurred. Please try again later.');
        console.error(error);
    }, []);

    const handleAsyncAction = useCallback(async (actionFunc) => {
        setIsLoading(true);
        setError(null);
        try {
            await actionFunc();
            return true;
        } catch (error) {
            handleError(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [handleError]);

    const fetchData = useCallback(async () => {
        if (workerId) {
            const data = await getWorkerById(workerId);
            setWorker(enhanceWorkerData(data));
        } else {
            switch (fetchType) {
                case 'withJobs':
                    const workersWithJobs = await getWorkersWithJobs();
                    setWorkers(workersWithJobs.map(enhanceWorkerData));
                    break;
                case 'withoutJobs':
                    const workersWithoutJobs = await getWorkersWithoutJobs();
                    setWorkers(workersWithoutJobs.map(enhanceWorkerData));
                    break;
                case 'all':
                    const allWorkers = await getWorkers();
                    setWorkers(allWorkers.map(enhanceWorkerData));
                    break;
                case 'count':
                    const totalCount = await getWorkersCount();
                    setCounts(prev => ({ ...prev, total: totalCount }));
                    break;
                case 'unemployedCount':
                    const unemployedCount = await getUnemployedWorkersCount();
                    setCounts(prev => ({ ...prev, unemployed: unemployedCount }));
                    break;
                default:
                    throw new Error(`Invalid fetchType: ${fetchType}`);
            }
        }
    }, [fetchType, workerId]);

    useEffect(() => {
        handleAsyncAction(fetchData);
    }, [fetchData, handleAsyncAction]);

    const handleWorkerAction = useCallback(async (actionFunc, updateStateFunc) => {
        return handleAsyncAction(async () => {
            const result = await actionFunc();
            updateStateFunc(result);
        });
    }, [handleAsyncAction]);

    const handleCreateWorker = useCallback(async (workerData) => {
        return handleWorkerAction(
            async () => await createWorker(workerData),
            (createdWorker) => setWorkers(prev => [...prev, enhanceWorkerData(createdWorker)])
        );
    }, [handleWorkerAction]);

    const handleUpdateWorker = useCallback(async (id, workerData) => {
        return handleWorkerAction(
            async () => await updateWorker(id, workerData),
            (updatedWorker) => {
                setWorkers(prev => prev.map(worker => worker.id === id ? enhanceWorkerData(updatedWorker) : worker));
                if (worker?.id === id) {
                    setWorker(enhanceWorkerData(updatedWorker));
                }
            }
        );
    }, [handleWorkerAction, worker]);

    const handleDeleteWorker = useCallback(async (id) => {
        return handleWorkerAction(
            async () => await deleteWorker(id),
            () => {
                setWorkers(prev => prev.filter(worker => worker.id !== id));
                if (worker?.id === id) {
                    setWorker(null);
                }
            }
        );
    }, [handleWorkerAction, worker]);

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