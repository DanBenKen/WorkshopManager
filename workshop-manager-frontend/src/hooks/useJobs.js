import { useState, useEffect } from 'react';
import { createJob, getJobs, updateJob, getJobById, deleteJob } from '../services/jobService';
import { getSupplyById, updateSupply } from '../services/supplyService';

const useJobs = (jobId) => {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [supply, setSupply] = useState(null);
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
                    if (data.supplyId) {
                        const supplyData = await getSupplyById(data.supplyId);
                        setSupply(supplyData);
                    }
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

    const handleCreateJob = async (jobData, quantity, supplyId) => {
        setIsLoading(true);
        setError(null);

        try {
            const supply = await getSupplyById(supplyId);

            if (supply.quantity < quantity) {
                throw new Error('Entered quantity exceeds available stock.');
            }

            const updatedSupply = { ...supply, quantity: supply.quantity - quantity };
            await updateSupply(supplyId, updatedSupply);

            await createJob(jobData);
            return true;
        } catch (error) {
            console.error('Error creating job:', error);
            setError(error.message || 'Failed to create job. Please try again later.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateJob = async (id, jobData, quantity, supplyId) => {
        setIsLoading(true);
        setError(null);

        try {
            const supply = await getSupplyById(supplyId);

            if (supply.quantity < quantity) {
                throw new Error('Entered quantity exceeds available stock.');
            }

            const updatedSupply = { ...supply, quantity: supply.quantity - quantity };
            await updateSupply(supplyId, updatedSupply);

            await updateJob(id, jobData);
            return true;
        } catch (error) {
            console.error('Error updating job:', error);
            setError(error.message || 'Failed to update job. Please try again later.');
            return false;
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

    return {
        jobs,
        job,
        supply,
        isLoading,
        error,
        handleCreateJob,
        handleUpdateJob,
        handleDeleteJob,
    };
};

export default useJobs;
