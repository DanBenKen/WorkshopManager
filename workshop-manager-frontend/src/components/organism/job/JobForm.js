import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../../molecules/FormField';
import useJobs from '../../../hooks/useJobs';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import ButtonCancel from '../../atoms/ButtonCancel';
import useValidation from '../../../hooks/useValidation';
import { validateJobForm } from '../../../utils/validators';

const JobForm = () => {
    const { jobId } = useParams();
    const { job, handleCreateJob, handleUpdateJob, isLoading, error } = useJobs(jobId);
    const navigate = useNavigate();

    const [jobName, setJobName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('1');
    const [workerId, setWorkerId] = useState('');
    const [supplyId, setSupplyId] = useState('');
    const [quantity, setQuantity] = useState('');

    const isEditMode = !!jobId;

    const {
        values: { jobName: formJobName, description: formDescription, status: formStatus, workerId: formWorkerId, supplyId: formSupplyId, quantity: formQuantity },
        errors,
        handleChange,
        resetErrors,
        validateForm
    } = useValidation(
        { jobName, description, status, workerId, supplyId, quantity },
        validateJobForm
    );

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

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        resetErrors();
        const isValidForm = validateForm();
        if (!isValidForm) return;

        const statusMap = {
            1: 'InProgress',
            2: 'Completed',
        };

        const jobData = {
            id: jobId ? parseInt(jobId, 10) : 0,
            jobName: formJobName,
            description: formDescription,
            status: statusMap[formStatus],
            workerId: parseInt(formWorkerId, 10),
            supplyId: formSupplyId ? parseInt(formSupplyId, 10) : null,
            supplyQuantity: parseInt(formQuantity, 10),
        };

        const success = isEditMode
            ? await handleUpdateJob(jobId, jobData)
            : await handleCreateJob(jobData);

        if (success) {
            navigate('/jobs');
        }
    }, [validateForm, resetErrors, handleCreateJob, handleUpdateJob, navigate, isEditMode, jobId, formJobName, formDescription, formStatus, formWorkerId, formSupplyId, formQuantity]);

    const handleBack = () => {
        if (isEditMode && job) {
            navigate(`/jobs/details/${job.id}`);
        } else {
            navigate('/jobs');
        }
    };

    const statusOptions = () => [
        { value: 1, label: 'In Progress' },
        { value: 2, label: 'Completed' }
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Job' : 'Create New Job'}</h2>
            {error && !Object.values(errors).some((e) => e) && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Job Name"
                    type="text"
                    name="jobName"
                    value={formJobName}
                    onChange={handleChange}
                    placeholder="Enter job name"
                    errorMessage={errors.jobName}
                />
                <FormField
                    label="Description"
                    type="text"
                    name="description"
                    value={formDescription}
                    onChange={handleChange}
                    placeholder="Enter job description"
                    errorMessage={errors.description}
                />
                <FormField
                    label="Status"
                    type="select"
                    id="Status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={statusOptions}
                />
                <FormField
                    label="Worker ID"
                    type="number"
                    name="workerId"
                    value={formWorkerId}
                    onChange={handleChange}
                    placeholder="Enter worker ID"
                    errorMessage={errors.workerId}
                />
                <FormField
                    label="Supply ID"
                    type="number"
                    name="supplyId"
                    value={formSupplyId}
                    onChange={handleChange}
                    placeholder="Enter supply ID"
                    errorMessage={errors.supplyId}
                />
                <FormField
                    label="Supply Quantity"
                    type="number"
                    name="quantity"
                    value={formQuantity}
                    onChange={handleChange}
                    placeholder="Enter quantity of supply needed"
                    errorMessage={errors.quantity}
                />

                <Button
                    type="submit"
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
                disabled={isLoading}
                onClick={handleBack}
                className={'mt-3'}
            >
                Go Back
            </ButtonCancel>
        </div>
    );
};

export default JobForm;
