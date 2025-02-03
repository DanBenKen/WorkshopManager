import { useState, useEffect } from 'react';
import { createJob, getJobs, updateJob, getJobById, deleteJob, getTotalCompletedJobs, getJobsInProgressCount } from '../services/jobService';
import { getSupplyById, updateSupply } from '../services/supplyService';

const useJobs = (jobId, fetchType = 'all') => {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (jobId) return;

                let data;
                switch(fetchType) {
                    case 'completedCount':
                        data = await getTotalCompletedJobs();
                        setTotalCompleted(data);
                        break;
                    case 'inProgressCount':
                        data = await getJobsInProgressCount();
                        setInProgress(data);
                        break;
                    case 'all':
                        data = await getJobs();
                        setJobs(data);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                setError("Failed to fetch job data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [fetchType, jobId]);

    useEffect(() => {
        const fetchJob = async () => {
            if (!jobId) return;

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
    }, [jobId]);

    const handleCreateJob = async (jobData) => {
        setIsLoading(true);
        setError(null);

        try {
            const { supplyId, supplyQuantity } = jobData;

            if (supplyId) {
                const supply = await getSupplyById(supplyId);

                if (supply.quantity < supplyQuantity) {
                    throw new Error('Entered quantity exceeds available stock.');
                }

                const updatedSupply = { ...supply, quantity: supply.quantity - supplyQuantity };
                await updateSupply(supplyId, updatedSupply);
            }

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

    const handleUpdateJob = async (id, jobData) => {
        setIsLoading(true);
        setError(null);
    
        try {
            const { supplyId, supplyQuantity } = jobData;
    
            if (supplyId) {
                const currentJob = await getJobById(id);
    
                if (currentJob) {
                    const oldSupplyQuantity = currentJob.supplyQuantity;
    
                    if (supplyQuantity < oldSupplyQuantity) {
                        const quantityToReturn = oldSupplyQuantity - supplyQuantity;
                        const supply = await getSupplyById(supplyId);
    
                        const updatedSupply = { ...supply, quantity: supply.quantity + quantityToReturn };
                        await updateSupply(supplyId, updatedSupply);
                    } else if (supplyQuantity > oldSupplyQuantity) {
                        const quantityToDeduct = supplyQuantity - oldSupplyQuantity;
                        const supply = await getSupplyById(supplyId);
    
                        if (supply.quantity < quantityToDeduct) {
                            throw new Error('Entered quantity exceeds available stock.');
                        }
    
                        const updatedSupply = { ...supply, quantity: supply.quantity - quantityToDeduct };
                        await updateSupply(supplyId, updatedSupply);
                    }
                }
            }
    
            await updateJob(id, jobData);
            return true;
        } catch (error) {
            console.error('Error updating job:', error);
            console.error('Error details:', error.response?.data);
            setError(error.response?.data?.message || error.message || 'Failed to update job. Please try again later.');
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

    const handleSetCompleted = async (job) => {
        setIsLoading(true);
        setError(null);

        try {
            const updatedJob = { ...job, status: 'Completed' };
            await updateJob(job.id, updatedJob);
            
            setJobs((prevJobs) => prevJobs.map((j) => (j.id === job.id ? updatedJob : j)));
        } catch (error) {
            console.error('Error completing job:', error);
            setError('Failed to mark job as completed. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        jobs,
        job,
        isLoading,
        error,
        inProgress,
        totalCompleted,
        handleCreateJob,
        handleUpdateJob,
        handleDeleteJob,
        handleSetCompleted,
    };
};

export default useJobs;
