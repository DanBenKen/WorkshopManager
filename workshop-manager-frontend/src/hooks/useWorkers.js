import { useState, useEffect, useCallback } from 'react';
import { createWorker, getWorkers, updateWorker, deleteWorker, getWorkersWithJobs, getWorkersCount, getUnemployedWorkersCount, getWorkersWithoutJobs, getWorkerById } from '../services/workerService';

const useWorkers = (fetchType = 'all') => {
  // State variables
  const [workers, setWorkers] = useState([]); // List of workers
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [counts, setCounts] = useState({ total: 0, unemployed: 0 }); // Worker counts
  const [worker, setWorker] = useState(null); // Single worker data

  // Function to get full name for a worker
  const getWorkersFullName = (workerData) => ({
    ...workerData,
    fullName: `${workerData.firstName} ${workerData.lastName}`,
  });

  /* ==========================
      Error Handling
  ========================== */
  const handleError = useCallback((error) => {
    setError(error.message || 'An error occurred. Please try again later.');
  }, []);

  /* ==========================
      Async Action Handling
  ========================== */

  // Wrapper to handle async actions with loading and error states
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

  /* ==========================
      State Update Functions
  ========================== */

  // Add new worker to the state
  const addWorkerToState = useCallback((newWorker) => {
    setWorkers((prevWorkers) => [...prevWorkers, newWorker]);
  }, []);

  // Update a worker's data in the state
  const updateWorkerInState = useCallback((updatedWorker) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) => (worker.id === updatedWorker.id ? updatedWorker : worker))
    );
  }, []);

  // Remove a worker from the state based on ID
  const removeWorkerFromState = useCallback((id) => {
    setWorkers((prevWorkers) => prevWorkers.filter((worker) => worker.id !== id));
  }, []);

  /* ==========================
      Data Fetching Functions
  ========================== */

  // Fetch workers based on the specified type (with jobs, without jobs, or all workers)
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

  // Fetch worker counts (total and unemployed)
  const fetchCountsData = async () => {
    const totalCount = await getWorkersCount();
    const unemployedCount = await getUnemployedWorkersCount();
    return { total: totalCount, unemployed: unemployedCount };
  };

  // Fetches all necessary data
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

  // Fetch a single worker by ID
  const fetchWorkerById = useCallback(async (id) => {
    await handleAsyncAction(async () => {
      const worker = await getWorkerById(id);
      setWorker(worker);
    });
  }, [handleAsyncAction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ==========================
      CRUD Operations
  ========================== */

  // Create a new worker and add it to the state
  const handleCreateWorker = useCallback(async (workerData) => {
    const result = await handleAsyncAction(async () => {
      const createdWorker = await createWorker(workerData);
      addWorkerToState(getWorkersFullName(createdWorker));
    });
    return result;
  }, [handleAsyncAction, addWorkerToState]);

  // Update an existing worker and reflect changes in the state
  const handleUpdateWorker = useCallback(async (id, workerData) => {
    const result = await handleAsyncAction(async () => {
      const updatedWorker = await updateWorker(id, workerData);
      updateWorkerInState(getWorkersFullName(updatedWorker));
    });
    return result;
  }, [handleAsyncAction, updateWorkerInState]);

  // Delete a worker and remove from the state
  const handleDeleteWorker = useCallback(async (id) => {
    const result = handleAsyncAction(async () => {
      await deleteWorker(id);
      removeWorkerFromState(id);
    });
    return result;
  }, [handleAsyncAction, removeWorkerFromState]);

  return {
    workers, isLoading, error, counts, worker,
    handleCreateWorker, handleUpdateWorker, handleDeleteWorker, fetchWorkerById,
  };
};

export default useWorkers;
