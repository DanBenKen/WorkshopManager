import { useState, useEffect, useCallback, useMemo } from 'react';
import { createJob, getJobs, updateJob, getJobById, deleteJob, getTotalCompletedJobs, getJobsInProgressCount } from '../services/jobService';
import { getSupplyById, updateSupply } from '../services/supplyService';
import { getWorkerById } from '../services/workerService';
import { JOB_STATUSES } from '../constants/jobStatus';

const useJobs = (jobId, fetchType = 'all') => {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dataFetchers = useMemo(() => ({
        'completedCount': async () => setTotalCompleted(await getTotalCompletedJobs()),
        'inProgressCount': async () => setInProgress(await getJobsInProgressCount()),
        'all': async () => setJobs(await getJobs())
    }), []);

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

    const fetchData = useCallback(() => handleAsyncAction(async () => {
        if (jobId) {
            setJob(await getJobById(jobId));
        } else {
            await dataFetchers[fetchType]?.();
        }
    }), [jobId, fetchType, dataFetchers, handleAsyncAction]);

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

        const validateWorker = async () => {
            try {
                await getWorkerById(jobData.workerId);
            } catch {
                errors.push(`Worker with ID ${jobData.workerId} not found.`);
            }
        };

        const validateSupply = async () => {
            if (!jobData.supplyId) return null;

            try {
                const supply = await getSupplyById(jobData.supplyId);
                checkSupplyQuantity(supply, jobData.supplyQuantity);
                return supply;
            } catch (error) {
                const errorMessage = error.message === 'Entered quantity exceeds available stock.'
                    ? error.message : `Supply with ID ${jobData.supplyId} not found.`;
                errors.push(errorMessage);
            }

            return null;
        };

        await Promise.all([validateWorker(), validateSupply()]);

        if (errors.length) throw errors;

        return jobData.supplyId;
    }, [checkSupplyQuantity]);

    const adjustSupplyQuantity = useCallback(async (supplyId, quantityChange) => {
        const supply = await getSupplyById(supplyId);
        if (quantityChange < 0) checkSupplyQuantity(supply, Math.abs(quantityChange));
        await updateSupply(supplyId, { ...supply, quantity: supply.quantity + quantityChange });
    }, [checkSupplyQuantity]);

    const updateSupplyOnJobChange = useCallback(async (currentJob, jobData) => {
        if (currentJob.supplyId && currentJob.supplyId !== jobData.supplyId) {
            await adjustSupplyQuantity(currentJob.supplyId, currentJob.supplyQuantity);
            await adjustSupplyQuantity(jobData.supplyId, -jobData.supplyQuantity);
        } else if (currentJob.supplyId === jobData.supplyId) {
            const diff = jobData.supplyQuantity - currentJob.supplyQuantity;
            if (diff !== 0) {
                await adjustSupplyQuantity(jobData.supplyId, -diff);
            }
        }
    }, [adjustSupplyQuantity]);

    const handleCreateJob = useCallback(async (jobData) => handleAsyncAction(async () => {
        const supplyId = await validateJobData(jobData);
        if (supplyId) {
            await adjustSupplyQuantity(supplyId, -jobData.supplyQuantity);
        }
        await createJob(jobData);
    }), [handleAsyncAction, validateJobData, adjustSupplyQuantity]);

    const handleUpdateJob = useCallback(async (id, jobData) => handleAsyncAction(async () => {
        await validateJobData(jobData);    
        const currentJob = await getJobById(id);
        await updateSupplyOnJobChange(currentJob, jobData);
        await updateJob(id, jobData);
    }), [handleAsyncAction, updateSupplyOnJobChange, validateJobData]);
    
    const handleDeleteJob = useCallback(async (id) => handleAsyncAction(async () => {
        await deleteJob(id);
        setJobs((prevJobs) => prevJobs.filter(job => job.id !== id));
    }), [handleAsyncAction]);

    const handleSetCompleted = useCallback(async (job) => handleAsyncAction(async () => {
        const updatedJob = { ...job, status: JOB_STATUSES.COMPLETED.apiValue };
        await updateJob(job.id, updatedJob);
        setJobs((prevJobs) => prevJobs.map(j => (j.id === job.id ? updatedJob : j)));
    }), [handleAsyncAction]);    

    return {
        jobs, job, isLoading, error, inProgress, totalCompleted,
        handleCreateJob, handleUpdateJob, handleDeleteJob, handleSetCompleted
    };
};

export default useJobs;
