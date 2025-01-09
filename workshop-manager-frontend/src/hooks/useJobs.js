import { useState, useEffect } from 'react';
import { createJob, getJobs, updateJob, getJobById, deleteJob } from '../services/jobService';

const useJobs = (jobId) => {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getJobs();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Failed to load jobs. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        if (jobId) {
            const fetchJob = async () => {
                setIsLoading(true);
                setError(null);

                try {
                    const data = await getJobById(jobId);
                    setJob(data);
                } catch (error) {
                    console.error('Error fetching job details:', error);
                    setError('Failed to load job details.');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchJob();
        }
    }, [jobId]);

    const handleCreateJob = async (jobData) => {
        setIsLoading(true);
        setError(null);

        try {
            await createJob(jobData);
        } catch (error) {
            console.error('Error creating job:', error);
            setError('Failed to create job. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateJob = async (id, jobData) => {
        setIsLoading(true);
        setError(null);

        try {
            await updateJob(id, jobData);
        } catch (error) {
            console.error('Error updating job:', error);
            setError('Failed to update job. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteJob = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            await deleteJob(id);
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
        } catch (error) {
            console.error('Error deleting job:', error);
            setError('Failed to delete job. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetCompleted = async (job) => {
        try {
            await updateJob(job.id, { ...job, status: 'Completed' });
        } catch (error) {
            console.error('Failed to update job status:', error);
            alert('Failed to set job to Completed. Please try again.');
        }
    };
    
    return {
        jobs,
        job,
        isLoading,
        error,
        handleCreateJob,
        handleUpdateJob,
        handleDeleteJob,
        handleSetCompleted,
    };
};

export default useJobs;
