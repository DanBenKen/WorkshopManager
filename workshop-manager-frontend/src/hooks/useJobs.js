import { useState, useEffect, useCallback, useMemo } from 'react';
import { createJob, getJobs, updateJob, getJobById, deleteJob } from '../services/jobService';
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
        if (error.response && error.response.data && error.response.data.detail) {
            setError([error.response.data.detail]);
        } else {
            setError(Array.isArray(error) ? error : [error.message || 'An unknown error occurred.']);
        }
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
        CRUD Operations
    ========================== */

    // handleCreateJob validates job data, adjusts supply, and creates a new job.
    const handleCreateJob = useCallback(async (jobData) => handleAsyncAction(async () => {
        await createJob(jobData);
        addJobToState(jobData);
    }), [handleAsyncAction]);    

    // handleUpdateJob validates updated job data, adjusts supply quantities as needed, and updates the job.
    const handleUpdateJob = useCallback(async (id, jobData) => handleAsyncAction(async () => {
        await updateJob(id, jobData);
        updateJobInState(jobData);
    }), [handleAsyncAction]);

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
