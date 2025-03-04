import React, { useEffect, useCallback, useState } from 'react';
import { validateJobForm } from '../../../utils/validators';
import { JOB_STATUSES, STATUS_OPTIONS } from '../../../constants/jobStatus';
import FormField from '../../molecules/FormField';
import useJobs from '../../../hooks/useJobs';
import useSupplies from '../../../hooks/useSupplies';
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
    const { job, handleCreateJob, handleUpdateJob, error, supplies, workers } = useJobs(jobId);
    const { validateSupplyQuantity } = useSupplies();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const isEditMode = !!jobId;

    const { values, errors, handleChange, resetErrors, validateForm, resetValues } =
        useValidation(initialFormState, validateJobForm);

    const getFormStateFromJob = useCallback((job) => {
        const statusEntry = Object.values(JOB_STATUSES).find(s => s.apiValue === job.status);
        return {
            jobName: job.jobName,
            description: job.description,
            status: statusEntry ? statusEntry.id.toString() : JOB_STATUSES.IN_PROGRESS.id.toString(),
            workerId: job.workerId,
            supplyId: job.supplyId || '',
            quantity: job.supplyQuantity ? job.supplyQuantity.toString() : ''
        };
    }, []);

    useEffect(() => {
        if (job) {
            resetValues(getFormStateFromJob(job));
        }
    }, [job, getFormStateFromJob, resetValues]);

    const resetForm = useCallback(() => {
        if (isEditMode && job) {
            resetValues(getFormStateFromJob(job));
        } else {
            resetValues(initialFormState);
        }
        resetErrors();
    }, [isEditMode, job, getFormStateFromJob, resetValues, resetErrors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) return;

        if (values.supplyId) {
            const supplyQuantityError = validateSupplyQuantity(values.supplyId, values.quantity);
            if (supplyQuantityError) {
                validationErrors.quantity = supplyQuantityError;
                return;
            }
        }

        const selectedStatus = Object.values(JOB_STATUSES).find(
            s => s.id === parseInt(values.status, 10)
        ) || JOB_STATUSES.IN_PROGRESS;

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
            toast.success(
                isEditMode
                    ? `Job: ${jobData.jobName} updated successfully!`
                    : `Job ${jobData.jobName} created successfully!`
            );
            await refreshJobs();
            onClose();
        } else {
            setIsButtonLoading(false);
        }
    };

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
                        onChange={handleChange}
                        placeholder="Enter job name"
                        errorMessage={errors.jobName}
                        required
                    />

                    <FormField
                        label="Description"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Enter job description"
                        errorMessage={errors.description}
                        required
                    />

                    <FormField
                        label="Status"
                        type="select"
                        id="status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        options={STATUS_OPTIONS}
                        required
                    />

                    <FormField
                        label="Worker"
                        type="select"
                        id="workerId"
                        name="workerId"
                        value={values.workerId}
                        onChange={handleChange}
                        placeholder="Select worker"
                        errorMessage={errors.workerId}
                        options={[
                            { value: '', label: 'Select Worker' },
                            ...workers.map(worker => ({
                                value: worker.id,
                                label: `ID:${worker.id} - ${worker.firstName} ${worker.lastName}`
                            }))
                        ]}
                        required
                    />

                    <FormField
                        label="Supply"
                        type="select"
                        id="supplyId"
                        name="supplyId"
                        value={values.supplyId}
                        onChange={handleChange}
                        placeholder="Select supply"
                        errorMessage={errors.supplyId}
                        options={[
                            { value: '', label: 'Select Supply' },
                            ...supplies.map(supply => ({
                                value: supply.id,
                                label: `ID:${supply.id} - ${supply.name}`
                            }))
                        ]}
                        required
                    />

                    <FormField
                        label="Supply Quantity"
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity of supply needed"
                        errorMessage={errors.quantity}
                        required
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
