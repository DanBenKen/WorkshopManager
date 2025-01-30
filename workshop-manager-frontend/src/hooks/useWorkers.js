import { useState, useEffect } from 'react';
import { createWorker, getWorkers, updateWorker, getWorkerById, deleteWorker, getWorkersWithJobs, getWorkersCount, getUnemployedWorkersCount, getWorkersWithoutJobs } from '../services/workerService';

const useWorkers = (workerId, fetchType = 'all') => {
    const [workers, setWorkers] = useState([]);
    const [worker, setWorker] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [unemployedCount, setUnemployedCount] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          setError(null);
      
          try {
            if (workerId) return;
      
            let data;
            if (fetchType === "withJobs") {
              data = await getWorkersWithJobs();
            }
            else if (fetchType === 'withoutJobs') {
              data = await getWorkersWithoutJobs();
            } else if (fetchType === "all") {
              data = await getWorkers();
            } else if (fetchType === "count") {
              const countData = await getWorkersCount();
              setCount(countData);
              return;
            } else if (fetchType === "unemployedCount") {
              const unemployedData = await getUnemployedWorkersCount();
              setUnemployedCount(unemployedData);
              return;
            }
      
            const workersWithFullName = data.map((worker) => ({
              ...worker,
              fullName: `${worker.firstName} ${worker.lastName}`,
            }));
      
            setWorkers(workersWithFullName);
          } catch (error) {
            setError("Failed to fetch workers. Please try again later.");
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
      }, [fetchType, workerId]);

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
        count,
        unemployedCount,
        getWorkersWithoutJobs,
        handleCreateWorker,
        handleUpdateWorker,
        handleDeleteWorker,
    };
};

export default useWorkers;