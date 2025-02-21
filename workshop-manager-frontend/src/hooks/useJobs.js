import { useState, useEffect } from 'react';
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

    const handleError = (error) => {
        setError(Array.isArray(error) ? error : [error.message || 'An unknown error occurred.']);
    };

    const handleAsyncAction = async (actionFunc) => {
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
    };

    useEffect(() => {
        const fetchData = async () => {
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
        };
        fetchData();
    }, [jobId, fetchType]);

    const validateJobData = async (jobData) => {
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
                if (supply.quantity < jobData.supplyQuantity) {
                    errors.push('Entered quantity exceeds available stock.');
                }
            } catch {
                errors.push(`Supply with ID ${jobData.supplyId} not found.`);
            }
        }

        if (errors.length) throw errors;
        return supply;
    };

    const adjustSupplyQuantity = async (supplyId, oldQuantity, newQuantity) => {
        const supply = await getSupplyById(supplyId);
        const diff = newQuantity - oldQuantity;
        if (diff > 0 && supply.quantity < diff) {
            throw new Error('Entered quantity exceeds available stock.');
        }
        await updateSupply(supplyId, { ...supply, quantity: supply.quantity - diff });
    };

    const handleCreateJob = async (jobData) => handleAsyncAction(async () => {
        const supply = await validateJobData(jobData);
        if (supply) {
            await updateSupply(jobData.supplyId, { ...supply, quantity: supply.quantity - jobData.supplyQuantity });
        }
        await createJob(jobData);
    });

    const handleUpdateJob = async (id, jobData) => handleAsyncAction(async () => {
        const currentJob = await getJobById(id);
        if (!currentJob) throw new Error(`Job with ID ${id} not found.`);

        if (jobData.supplyId) {
            await adjustSupplyQuantity(jobData.supplyId, currentJob.supplyQuantity, jobData.supplyQuantity);
        }
        await updateJob(id, jobData);
    });

    const handleDeleteJob = async (id) => handleAsyncAction(async () => {
        await deleteJob(id);
        setJobs((prevJobs) => prevJobs.filter(job => job.id !== id));
    });

    const handleSetCompleted = async (job) => handleAsyncAction(async () => {
        const updatedJob = { ...job, status: 'Completed' };
        await updateJob(job.id, updatedJob);
        setJobs((prevJobs) => prevJobs.map(j => (j.id === job.id ? updatedJob : j)));
    });

    return {
        jobs, job, isLoading, error, inProgress, totalCompleted,
        handleCreateJob, handleUpdateJob, handleDeleteJob, handleSetCompleted
    };
};

export default useJobs;
