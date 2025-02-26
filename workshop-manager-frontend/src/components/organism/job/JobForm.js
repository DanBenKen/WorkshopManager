import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateJobForm } from '../../../utils/validators';
import { JOB_STATUSES, STATUS_OPTIONS } from '../../../constants/jobStatus';
import FormField from '../../molecules/FormField';
import useJobs from '../../../hooks/useJobs';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import ButtonCancel from '../../atoms/ButtonCancel';
import useValidation from '../../../hooks/useValidation';

const JobForm = () => {
    const { jobId } = useParams();
    const { job, handleCreateJob, handleUpdateJob, isLoading, error } = useJobs(jobId);
    const navigate = useNavigate();

    const [jobName, setJobName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(JOB_STATUSES.IN_PROGRESS.id.toString());
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
            const statusEntry = Object.values(JOB_STATUSES).find(s => s.apiValue === job.status);

            setJobName(job.jobName);
            setDescription(job.description);
            setStatus(statusEntry?.id.toString() || JOB_STATUSES.IN_PROGRESS.id.toString());
            setWorkerId(job.workerId);
            setSupplyId(job.supplyId || '');
            setQuantity(job.supplyQuantity || '');
        }
    }, [job]);

    const prevSupplyIdRef = useRef(formSupplyId);
    
    useEffect(() => {
        if (!isEditMode)
        {
            if (prevSupplyIdRef.current !== formSupplyId) {
                handleChange({
                    target: {
                        name: 'quantity',
                        value: '',
                    },
                });
                prevSupplyIdRef.current = formSupplyId;
            }
        }
    }, [formSupplyId, handleChange, isEditMode]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        resetErrors();
        const isValidForm = validateForm();
        if (!isValidForm) return;

        const selectedStatus = Object.values(JOB_STATUSES).find(
            s => s.id === parseInt(formStatus, 10)
        );

        const jobData = {
            id: jobId ? parseInt(jobId, 10) : 0,
            jobName: formJobName,
            description: formDescription,
            status: selectedStatus.apiValue,
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
                    name="status"
                    value={formStatus}
                    onChange={handleChange}
                    options={STATUS_OPTIONS}
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
