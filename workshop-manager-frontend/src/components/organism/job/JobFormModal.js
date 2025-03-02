import React, { useState, useEffect, useCallback } from 'react';
import { validateJobForm } from '../../../utils/validators';
import { JOB_STATUSES, STATUS_OPTIONS } from '../../../constants/jobStatus';
import FormField from '../../molecules/FormField';
import useJobs from '../../../hooks/useJobs';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useValidation from '../../../hooks/useValidation';
import Modal from '../../molecules/Modal';
import { toast } from 'react-toastify';
import ButtonCancel from '../../atoms/ButtonCancel';
import { FiRefreshCcw, FiX } from 'react-icons/fi';

const initialFormState = {
    jobName: '',
    description: '',
    status: JOB_STATUSES.IN_PROGRESS.id.toString(),
    workerId: '',
    supplyId: '',
    quantity: ''
};

const JobFormModal = ({ jobId, onClose, refreshJobs }) => {
    const { job, handleCreateJob, handleUpdateJob, error } = useJobs(jobId);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const isEditMode = !!jobId;

    const {
        values,
        errors,
        handleChange,
        resetErrors,
        validateForm
    } = useValidation(formData, validateJobForm);

    const handleFieldChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        handleChange(e);
    }, [handleChange]);

    const getFormStateFromJob = useCallback((job) => {
        const statusEntry = Object.values(JOB_STATUSES).find(s => s.apiValue === job.status);
        return {
            jobName: job.jobName,
            description: job.description,
            status: statusEntry ? statusEntry.id.toString() : JOB_STATUSES.IN_PROGRESS.id.toString(),
            workerId: job.workerId,
            supplyId: job.supplyId || '',
            quantity: job.supplyQuantity || ''
        };
    }, []);

    useEffect(() => {
        if (job) {
            setFormData(getFormStateFromJob(job));
        }
    }, [job, getFormStateFromJob]);

    const resetForm = useCallback(() => {
        if (isEditMode && job) {
            setFormData(getFormStateFromJob(job));
        } else {
            setFormData(initialFormState);
        }
        resetErrors();
    }, [isEditMode, job, getFormStateFromJob, resetErrors]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        resetErrors();
        const isValidForm = validateForm();
        if (!isValidForm) return;

        const selectedStatus = Object.values(JOB_STATUSES).find(
            s => s.id === parseInt(values.status, 10)
        );

        const jobData = {
            jobName: values.jobName,
            description: values.description,
            status: selectedStatus.apiValue,
            workerId: values.workerId ? parseInt(values.workerId, 10) : null,
            supplyId: values.supplyId ? parseInt(values.supplyId, 10) : null,
            supplyQuantity: parseInt(values.quantity, 10),
        };

        if (isEditMode) {
            jobData.id = parseInt(jobId, 10);
        }

        setIsButtonLoading(true);

        const success = isEditMode
            ? await handleUpdateJob(jobId, jobData)
            : await handleCreateJob(jobData);

        if (success) {
            toast.success(isEditMode
                ? `Job: ${jobData.jobName} updated successfully!`
                : 'Job created successfully!');
            await refreshJobs();
            onClose();
        } else {
            setIsButtonLoading(false);
        }
    }, [
        validateForm,
        values,
        isEditMode,
        jobId,
        handleUpdateJob,
        handleCreateJob,
        refreshJobs,
        onClose,
        resetErrors
    ]);

    return (
        <Modal onClose={onClose}>
            <div>
                <h2 className="text-2xl font-bold mb-2">
                    {isEditMode ? 'Edit Job' : 'Create New Job'}
                </h2>

                {<ErrorMessage message={error} />}

                <form onSubmit={handleSubmit}>
                    <FormField
                        label="Job Name"
                        type="text"
                        id="jobName"
                        name="jobName"
                        value={values.jobName}
                        onChange={handleFieldChange}
                        placeholder="Enter job name"
                        errorMessage={errors.jobName}
                    />

                    <FormField
                        label="Description"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleFieldChange}
                        placeholder="Enter job description"
                        errorMessage={errors.description}
                    />

                    <FormField
                        label="Status"
                        type="select"
                        id="status"
                        name="status"
                        value={values.status}
                        onChange={handleFieldChange}
                        options={STATUS_OPTIONS}
                    />

                    <FormField
                        label="Worker ID"
                        type="number"
                        id="workerId"
                        name="workerId"
                        value={values.workerId}
                        onChange={handleFieldChange}
                        placeholder="Enter worker ID"
                        errorMessage={errors.workerId}
                    />

                    <FormField
                        label="Supply ID"
                        type="number"
                        id="supplyId"
                        name="supplyId"
                        value={values.supplyId}
                        onChange={handleFieldChange}
                        placeholder="Enter supply ID"
                        errorMessage={errors.supplyId}
                    />

                    <FormField
                        label="Supply Quantity"
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleFieldChange}
                        placeholder="Enter quantity of supply needed"
                        errorMessage={errors.quantity}
                    />

                    <div className="mt-6 flex gap-3">
                        <ButtonCancel type="button" onClick={onClose}>
                            <FiX className="w-7 h-7" />
                        </ButtonCancel>
                        <Button type="button" onClick={resetForm}>
                            <FiRefreshCcw className="w-6 h-6" />
                        </Button>
                        <Button type="submit" disabled={isButtonLoading}>
                            {isButtonLoading
                                ? isEditMode ? 'Updating...' : 'Creating...'
                                : isEditMode ? 'Update Job' : 'Create Job'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default JobFormModal;
