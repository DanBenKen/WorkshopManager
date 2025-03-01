import React, { useState, useEffect } from 'react';
import { validateJobForm } from '../../../utils/validators';
import { JOB_STATUSES, STATUS_OPTIONS } from '../../../constants/jobStatus';
import FormField from '../../molecules/FormField';
import useJobs from '../../../hooks/useJobs';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useValidation from '../../../hooks/useValidation';
import Modal from '../../molecules/Modal';
import { toast } from 'react-toastify';

const JobFormModal = ({ jobId, onClose, refreshJobs }) => {
    const { job, handleCreateJob, handleUpdateJob, error } = useJobs(jobId);
    const [isButtonLoading, setIsButtonLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();
        const isValidForm = validateForm();
        if (!isValidForm) return;
    
        const selectedStatus = Object.values(JOB_STATUSES).find(
            s => s.id === parseInt(formStatus, 10)
        );
    
        const jobData = {
            jobName: formJobName,
            description: formDescription,
            status: selectedStatus.apiValue,
            workerId: formWorkerId ? parseInt(formWorkerId, 10) : null,
            supplyId: formSupplyId ? parseInt(formSupplyId, 10) : null,
            supplyQuantity: parseInt(formQuantity, 10),
        };
    
        if (isEditMode) {
            jobData.id = parseInt(jobId, 10);
        }
    
        setIsButtonLoading(true);
    
        const success = isEditMode
            ? await handleUpdateJob(jobId, jobData)
            : await handleCreateJob(jobData);

        if (success) {
            toast.success(isEditMode ? `Job: ${jobData.jobName} updated successfully!` : 'Job created successfully!');
            await refreshJobs();
            onClose();
        } else {
            setIsButtonLoading(false);
        }
    };    

    return (
        <Modal onClose={onClose}>
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

                    <Button type="submit" disabled={isButtonLoading}>
                        {isButtonLoading ? (isEditMode ? 'Updating...' : 'Creating...') : isEditMode ? 'Update Job' : 'Create Job'}
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default JobFormModal;
