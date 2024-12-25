import { useState, useEffect } from 'react';
import JobService from '../services/JobService';

const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await JobService.getJobs();
            setJobs(data);
        } catch (err) {
            setError('Failed to load jobs.');
        } finally {
            setLoading(false);
        }
    };

    const createJob = async (jobData) => {
        setLoading(true);
        setError(null);
        try {
            const newJob = await JobService.createJob(jobData);
            setJobs((prevJobs) => [...prevJobs, newJob]);
        } catch (err) {
            setError('Failed to create a job.');
        } finally {
            setLoading(false);
        }
    };

    const updateJob = async (jobId, jobData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedJob = await JobService.updateJob(jobId, jobData);
            setJobs((prevJobs) =>
                prevJobs.map((job) => (job.id === jobId ? updatedJob : job))
            );
        } catch (err) {
            setError('Failed to update the job.');
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (jobId) => {
        setLoading(true);
        setError(null);
        try {
            await JobService.deleteJob(jobId);
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        } catch (err) {
            setError('Failed to delete the job.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return {
        jobs,
        loading,
        error,
        fetchJobs,
        createJob,
        updateJob,
        deleteJob,
    };
};

export default useJobs;
