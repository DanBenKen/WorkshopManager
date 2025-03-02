import { useState, useEffect, useCallback } from 'react';
import { createWorker, getWorkers, updateWorker, deleteWorker, getWorkersWithJobs, getWorkersCount, getUnemployedWorkersCount, getWorkersWithoutJobs, getWorkerById } from '../services/workerService';

const useWorkers = (fetchType = 'all') => {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({ total: 0, unemployed: 0 });
  const [worker, setWorker] = useState(null);

  const getWorkersFullName = (workerData) => ({
    ...workerData,
    fullName: `${workerData.firstName} ${workerData.lastName}`,
  });

  const handleError = useCallback((error) => {
    setError(error.message || 'An error occurred. Please try again later.');
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

  const addWorkerToState = useCallback((newWorker) => {
    setWorkers((prevWorkers) => [...prevWorkers, newWorker]);
  }, []);

  const updateWorkerInState = useCallback((updatedWorker) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) => (worker.id === updatedWorker.id ? updatedWorker : worker))
    );
  }, []);

  const removeWorkerFromState = useCallback((id) => {
    setWorkers((prevWorkers) => prevWorkers.filter((worker) => worker.id !== id));
  }, []);

  const fetchWorkersData = async (fetchType) => {
    switch (fetchType) {
      case 'withJobs':
        return await getWorkersWithJobs();
      case 'withoutJobs':
        return await getWorkersWithoutJobs();
      case 'all':
        return await getWorkers();
      default:
        throw new Error(`Invalid fetchType: ${fetchType}`);
    }
  };

  const fetchCountsData = async () => {
    const totalCount = await getWorkersCount();
    const unemployedCount = await getUnemployedWorkersCount();
    return { total: totalCount, unemployed: unemployedCount };
  };

  const fetchData = useCallback(async () => {
    await handleAsyncAction(async () => {
      if (fetchType === 'count' || fetchType === 'unemployedCount') {
        const counts = await fetchCountsData();
        setCounts(counts);
      } else {
        const workersData = await fetchWorkersData(fetchType);
        setWorkers(workersData.map(getWorkersFullName));
      }
    });
  }, [fetchType, handleAsyncAction]);

  const fetchWorkerById = useCallback(async (id) => {
    await handleAsyncAction(async () => {
      const worker = await getWorkerById(id);
      setWorker(getWorkersFullName(worker));
    });
  }, [handleAsyncAction]);

  const getWorkerJobCounts = (worker) => {
    const completedJobs = worker.jobs.filter((job) => job.status === 'Completed').length;
    const inProgressJobs = worker.jobs.filter((job) => job.status === 'In Progress').length;
    return { completedJobs, inProgressJobs };
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateWorker = useCallback(async (workerData) => {
    const result = await handleAsyncAction(async () => {
      const createdWorker = await createWorker(workerData);
      addWorkerToState(getWorkersFullName(createdWorker));
    });
    return result;
  }, [handleAsyncAction, addWorkerToState]);

  const handleUpdateWorker = useCallback(async (id, workerData) => {
    const result = await handleAsyncAction(async () => {
      const updatedWorker = await updateWorker(id, workerData);
      updateWorkerInState(getWorkersFullName(updatedWorker));
    });
    return result;
  }, [handleAsyncAction, updateWorkerInState]);

  const handleDeleteWorker = useCallback(async (id) => {
    const result = handleAsyncAction(async () => {
      await deleteWorker(id);
      removeWorkerFromState(id);
    });
    return result;
  }, [handleAsyncAction, removeWorkerFromState]);

  return {
    workers, isLoading, error, counts, worker, fetchData,
    handleCreateWorker, getWorkerJobCounts, handleUpdateWorker, handleDeleteWorker, fetchWorkerById, getWorkersFullName
  };
};

export default useWorkers;
