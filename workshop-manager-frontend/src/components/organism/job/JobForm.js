import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../../molecules/FormField';
import useJobs from '../../../hooks/useJobs';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import ButtonCancel from '../../atoms/ButtonCancel';

const JobForm = () => {
    const { jobId } = useParams();
    const [jobName, setJobName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('1');
    const [workerId, setWorkerId] = useState('');
    const [supplyId, setSupplyId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const { job, handleCreateJob, handleUpdateJob, isLoading, error } = useJobs(jobId);
    const navigate = useNavigate();

    const isEditMode = !!jobId;

    useEffect(() => {
        if (job) {
            setJobName(job.jobName);
            setDescription(job.description);
            setStatus(job.status);
            setWorkerId(job.workerId);
            setSupplyId(job.supplyId || '');
            setQuantity(job.supplyQuantity || '');
        }
    }, [job]);

    const validateForm = () => {
        const errors = {};
        if (!jobName) errors.jobName = 'Job name is required';
        if (!description) errors.description = 'Description is required';
        if (!workerId) errors.workerId = 'Worker ID is required';
        if (supplyId && !quantity) errors.quantity = 'Quantity is required if Supply ID is provided';
        if (quantity && isNaN(quantity)) errors.quantity = 'Quantity must be a valid number';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const statusMap = {
            0: 'Pending',
            1: 'InProgress',
            2: 'Completed',
        };

        const jobData = {
            id: jobId ? parseInt(jobId, 10) : null,
            jobName,
            description,
            status: statusMap[status],
            workerId: parseInt(workerId, 10),
            supplyId: supplyId ? parseInt(supplyId, 10) : null,
            supplyQuantity: parseInt(quantity, 10),
        };

        try {
            const success = isEditMode
                ? await handleUpdateJob(jobId, jobData)
                : await handleCreateJob(jobData);

            if (success) {
                navigate('/jobs');
            }
        } catch (err) {
            console.error('Error in handleSubmit:', err);
            setFormErrors(err.response?.data?.errors || err.message || 'An error occurred. Please try again later.');
        }
    };

    const handleBack = (job) => {
        if (isEditMode) {
            navigate(`/jobs/details/${job.id}`);
        } else {
            navigate('/jobs');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Job' : 'Create New Job'}</h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Job Name"
                    type="text"
                    id="JobName"
                    name="jobName"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    placeholder="Enter job name"
                    errorMessage={formErrors.jobName}
                />
                <FormField
                    label="Description"
                    type="text"
                    id="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter job description"
                    errorMessage={formErrors.description}
                />
                <FormField
                    label="Status"
                    type="select"
                    id="Status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={[
                        { value: 0, label: 'Pending' },
                        { value: 1, label: 'In Progress' },
                        { value: 2, label: 'Completed' }
                    ]}
                />

                <FormField
                    label="Worker ID"
                    type="number"
                    id="WorkerId"
                    name="workerId"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    placeholder="Enter worker ID"
                    errorMessage={formErrors.workerId}
                />
                <FormField
                    label="Supply ID"
                    type="number"
                    id="SupplyId"
                    name="supplyId"
                    value={supplyId}
                    onChange={(e) => setSupplyId(e.target.value)}
                    placeholder="Enter supply ID"
                />
                <FormField
                    label="Supply Quantity"
                    type="number"
                    id="Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity of supply needed"
                    errorMessage={formErrors.quantity}
                />

                <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600"
                    disabled={isLoading}
                >
                    {isLoading
                        ? (isEditMode ? 'Updating...' : 'Creating...')
                        : isEditMode
                            ? 'Update Job'
                            : 'Create Job'}
                </Button>
            </form>

            <ButtonCancel
                type="button"
                className="mt-2"
                disabled={isLoading}
                onClick={() => handleBack(job)}
            >
                Go Back
            </ButtonCancel>
        </div>
    );
};

export default JobForm;
