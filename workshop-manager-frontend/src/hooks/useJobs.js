import { useState, useEffect, useCallback, useMemo } from 'react';
import { createJob, getJobs, updateJob, getJobById, deleteJob } from '../services/jobService';
import { JOB_STATUSES } from '../constants/jobStatus';

const useJobs = (jobId) => {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const totalCompleted = useMemo(() =>
        jobs.filter(job => job.status === JOB_STATUSES.COMPLETED.apiValue).length,
        [jobs]
    );
    const inProgress = useMemo(() =>
        jobs.filter(job => job.status === JOB_STATUSES.IN_PROGRESS.apiValue).length,
        [jobs]
    );

    const handleError = useCallback((error) => {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400) {
                return;
            }

            if (data && data.detail) {
                setError([data.detail]);
            } else {
                setError(Array.isArray(error) ? error : [error.message || 'An unknown error occurred.']);
            }
        } else {
            setError([error.message || 'An unknown error occurred.']);
        }
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

    const addJobToState = (newJob) => {
        setJobs((prevJobs) => {
            const jobsMap = new Map(prevJobs.map(job => [job.id, job]));
            if (jobsMap.has(newJob.id)) return prevJobs;
            return [...prevJobs, newJob];
        });
    };

    const updateJobInState = (updatedJob) => {
        setJobs(prevJobs => prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    };

    const removeJobFromState = (jobId) => {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    };

    const fetchData = useCallback(() => handleAsyncAction(async () => {
        if (jobId) {
            try {
                const singleJob = await getJobById(jobId);
                setJob(singleJob);
            } catch (error) {
                if (error.response?.status === 404) {
                    setJob(null);
                }
            }
        } else {
            const allJobs = await getJobs();
            setJobs(allJobs);
        }
    }), [jobId, handleAsyncAction]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreateJob = useCallback(async (jobData) => handleAsyncAction(async () => {
        const createdJob = await createJob(jobData);
        addJobToState(createdJob);
    }), [handleAsyncAction]);

    const handleUpdateJob = useCallback(async (id, jobData) => handleAsyncAction(async () => {
        const updatedJob = await updateJob(id, jobData);
        updateJobInState(updatedJob);
    }), [handleAsyncAction]);

    const handleDeleteJob = useCallback(async (id) => handleAsyncAction(async () => {
        const deletedJob = await deleteJob(id);
        removeJobFromState(deletedJob);
    }), [handleAsyncAction]);

    const handleSetCompleted = useCallback(async (job) => {
        await handleAsyncAction(async () => {
            const previousJob = { ...job };
            const setCompleted = { ...job, status: JOB_STATUSES.COMPLETED.apiValue };
            updateJobInState(setCompleted);
            try {
                await updateJob(job.id, setCompleted);
            } catch (error) {
                updateJobInState(previousJob);
                throw error;
            }
        });
    }, [handleAsyncAction]);

    return {
        jobs, job, isLoading, error, inProgress, totalCompleted,
        handleCreateJob, handleUpdateJob, handleDeleteJob, handleSetCompleted, fetchData
    };
};

export default useJobs;
