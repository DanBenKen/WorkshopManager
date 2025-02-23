import { useState, useEffect, useCallback } from 'react';
import { createJob, getJobs, updateJob, getJobById, deleteJob, getTotalCompletedJobs, getJobsInProgressCount } from '../services/jobService';
import { getSupplyById, updateSupply } from '../services/supplyService';
import { getWorkerById } from '../services/workerService';

const useJobs = (jobId, fetchType = 'all') => {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleError = useCallback((error) => {
        setError(Array.isArray(error) ? error : [error.message || 'An unknown error occurred.']);
    }, []);

    const handleAsyncAction = useCallback(async (actionFunc) => {
        setIsLoading(true);
        setError(null);
        try {
            await actionFunc();
            return true;
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [handleError]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (jobId) {
                setJob(await getJobById(jobId));
            } else {
                const dataFetchers = {
                    'completedCount': async () => setTotalCompleted(await getTotalCompletedJobs()),
                    'inProgressCount': async () => setInProgress(await getJobsInProgressCount()),
                    'all': async () => setJobs(await getJobs())
                };
                await dataFetchers[fetchType]?.();
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, [jobId, fetchType, handleError]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const checkSupplyQuantity = useCallback((supply, requiredQuantity) => {
        if (supply.quantity < requiredQuantity) {
            throw new Error('Entered quantity exceeds available stock.');
        }
    }, []);

    const validateJobData = useCallback(async (jobData) => {
        const errors = [];
        let supply = null;
    
        try {
            await getWorkerById(jobData.workerId);
        } catch {
            errors.push(`Worker with ID ${jobData.workerId} not found.`);
        }
    
        if (jobData.supplyId) {
            try {
                supply = await getSupplyById(jobData.supplyId);
                checkSupplyQuantity(supply, jobData.supplyQuantity);
            } catch (error) {
                errors.push(error.message || `Supply with ID ${jobData.supplyId} not found.`);
            }
        }
    
        if (errors.length) throw errors;
        return supply;
    }, [checkSupplyQuantity]);

    const adjustSupplyQuantity = useCallback(async (supplyId, oldQuantity, newQuantity) => {
        const supply = await getSupplyById(supplyId);
        const diff = newQuantity - oldQuantity;
        if (diff > 0) {
            checkSupplyQuantity(supply, diff);
        }
        await updateSupply(supplyId, { ...supply, quantity: supply.quantity - diff });
    }, [checkSupplyQuantity]);

    const handleCreateJob = useCallback(async (jobData) => handleAsyncAction(async () => {
        const supply = await validateJobData(jobData);
        if (supply) {
            await updateSupply(jobData.supplyId, { ...supply, quantity: supply.quantity - jobData.supplyQuantity });
        }
        await createJob(jobData);
    }), [handleAsyncAction, validateJobData]);

    const handleUpdateJob = useCallback(async (id, jobData) => handleAsyncAction(async () => {
        const currentJob = await getJobById(id);
        if (!currentJob) throw new Error(`Job with ID ${id} not found.`);

        if (jobData.supplyId) {
            await adjustSupplyQuantity(jobData.supplyId, currentJob.supplyQuantity, jobData.supplyQuantity);
        }
        await updateJob(id, jobData);
    }), [handleAsyncAction, adjustSupplyQuantity]);

    const handleDeleteJob = useCallback(async (id) => handleAsyncAction(async () => {
        await deleteJob(id);
        setJobs((prevJobs) => prevJobs.filter(job => job.id !== id));
    }), [handleAsyncAction]);

    const handleSetCompleted = useCallback(async (job) => handleAsyncAction(async () => {
        const updatedJob = { ...job, status: 'Completed' };
        await updateJob(job.id, updatedJob);
        setJobs((prevJobs) => prevJobs.map(j => (j.id === job.id ? updatedJob : j)));
    }), [handleAsyncAction]);

    return {
        jobs, job, isLoading, error, inProgress, totalCompleted,
        handleCreateJob, handleUpdateJob, handleDeleteJob, handleSetCompleted
    };
};

export default useJobs;
