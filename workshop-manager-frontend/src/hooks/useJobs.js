import { useState, useEffect, useCallback, useMemo } from 'react';
import { createJob, getJobs, updateJob, getJobById, deleteJob } from '../services/jobService';
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

    /* ==========================
        Data Fetchers (Memoized)
    ========================== */
    const dataFetchers = useMemo(() => ({
        'all': async () => {
            const allJobs = await getJobs();
            setJobs(allJobs);
            setTotalCompleted(allJobs.filter(job => job.status === 'Completed').length);
            setInProgress(allJobs.filter(job => job.status === 'In Progress').length);
        }
    }), []);

    /* ==========================
        Error Handling
    ========================== */
    const handleError = useCallback((error) => {
        setError(Array.isArray(error) ? error : [error.message || 'An unknown error occurred.']);
    }, []);

    /* ==========================
        Async Action Handling
    ========================== */
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

    // Adds a new Job to the state
    const addJobToState = (newJob) => {
        setJobs((prevJobs) => [...prevJobs, newJob]);
    };
    
    // Updates the jobs state with the latest supply data
    const updateJobInState = (updatedJob) => {
        setJobs((prevJobs) => prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    };
    
    // Removes a jobs from the state based on its ID
    const removeJobFromState = (jobId) => {
        setJobs((prevJobs) => prevJobs.filter(job => job.id !== jobId));
    };

    /* ==========================
        Data Fetching
    ========================== */

    const fetchData = useCallback(() => handleAsyncAction(async () => {
        if (jobId) setJob(await getJobById(jobId));
        await dataFetchers[fetchType]?.();
    }), [jobId, fetchType, dataFetchers, handleAsyncAction]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /* ==========================
        Domain-specific Helper Functions
    ========================== */

    // isStockSufficient ensures the available supply meets the required quantity.
    const isStockSufficient = useCallback((supply, requiredQuantity) => {
        if (supply.quantity < requiredQuantity)
            throw new Error('Entered quantity exceeds available stock.');
    }, []);

    // validateJobData verifies worker and supply exist and have enough quantity.
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
            try {
                const supply = await getSupplyById(jobData.supplyId);
                isStockSufficient(supply, jobData.supplyQuantity);
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
    }, [isStockSufficient]);

    // adjustSupplyQuantity updates the supply quantity ensuring no negative stock.
    const adjustSupplyQuantity = useCallback(async (supplyId, quantityChange) => {
        const supply = await getSupplyById(supplyId);
        if (quantityChange < 0)
            isStockSufficient(supply, Math.abs(quantityChange));

        await updateSupply(supplyId, { ...supply, quantity: supply.quantity + quantityChange });
    }, [isStockSufficient]);

    // updateSupplyOnJobChange adjusts supply quantities when a job's supply or quantity changes.
    const updateSupplyOnJobChange = useCallback(async (currentJob, jobData) => {
        if (currentJob.supplyId !== jobData.supplyId) {
            if (currentJob.supplyId)
                await adjustSupplyQuantity(currentJob.supplyId, currentJob.supplyQuantity);

            if (jobData.supplyId)
                await adjustSupplyQuantity(jobData.supplyId, -jobData.supplyQuantity);
        } else if (currentJob.supplyQuantity !== jobData.supplyQuantity) {
            const diff = jobData.supplyQuantity - currentJob.supplyQuantity;
            if (diff !== 0)
                await adjustSupplyQuantity(jobData.supplyId, -diff);
        }
    }, [adjustSupplyQuantity]);

    /* ==========================
        CRUD Operations
    ========================== */

    // handleCreateJob validates job data, adjusts supply, and creates a new job.
    const handleCreateJob = useCallback(async (jobData) => handleAsyncAction(async () => {
        const supplyId = await validateJobData(jobData);
        if (supplyId)
            await adjustSupplyQuantity(supplyId, -jobData.supplyQuantity);

        await createJob(jobData);

        addJobToState(jobData);
    }), [handleAsyncAction, validateJobData, adjustSupplyQuantity]);

    // handleUpdateJob validates updated job data, adjusts supply quantities as needed, and updates the job.
    const handleUpdateJob = useCallback(async (id, jobData) => handleAsyncAction(async () => {
        const currentJob = await getJobById(id);

        await updateSupplyOnJobChange(currentJob, jobData);
        await updateJob(id, jobData);
        updateJobInState(jobData);
    }), [handleAsyncAction, updateSupplyOnJobChange]);

    // handleDeleteJob deletes the job and updates local state.
    const handleDeleteJob = useCallback(async (id) => handleAsyncAction(async () => {
        await deleteJob(id);
        removeJobFromState(id);
    }), [handleAsyncAction]);

    // handleSetCompleted marks a job as completed by updating its status.
    const handleSetCompleted = useCallback(async (job) => handleAsyncAction(async () => {
        const updatedJob = { ...job, status: JOB_STATUSES.COMPLETED.apiValue };
        await updateJob(job.id, updatedJob);
        updateJobInState(updatedJob);
    }), [handleAsyncAction]);

    return {
        jobs, job, isLoading, error, inProgress, totalCompleted,
        handleCreateJob, handleUpdateJob, handleDeleteJob, handleSetCompleted
    };
};

export default useJobs;
