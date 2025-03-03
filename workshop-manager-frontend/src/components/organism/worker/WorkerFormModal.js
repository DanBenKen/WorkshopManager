import React, { useState, useEffect, useCallback } from 'react';
import { validateWorkerForm } from '../../../utils/validators';
import FormField from '../../molecules/FormField';
import useWorkers from '../../../hooks/useWorkers';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useValidation from '../../../hooks/useValidation';
import Modal from '../../molecules/Modal';
import { POSITION_OPTIONS, WORKER_POSITIONS } from '../../../constants/workerPosition';
import { toast } from 'react-toastify';
import ButtonCancel from '../../atoms/ButtonCancel';
import { FiX, FiRefreshCcw } from 'react-icons/fi';

const initialFormState = {
    firstName: '',
    lastName: '',
    position: WORKER_POSITIONS.MECHANIC.apiValue
};

const WorkerFormModal = ({ workerId, onClose, refreshWorkers }) => {
    const { worker, fetchWorkerById, handleCreateWorker, handleUpdateWorker, error, clearError } = useWorkers();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const isEditMode = !!workerId;

    const [formData, setFormData] = useState(initialFormState);
    const { values, errors, handleChange, resetErrors, validateForm, resetValues } = useValidation(formData, validateWorkerForm);

    useEffect(() => {
        if (isEditMode && !worker) {
            fetchWorkerById(workerId);
        } else if (worker) {
            setFormData({
                firstName: worker.firstName,
                lastName: worker.lastName,
                position: worker.position
            });
        }
    }, [workerId, isEditMode, worker, fetchWorkerById]);

    const resetForm = useCallback(() => {
        if (isEditMode && worker) {
            resetValues({
                firstName: worker.firstName,
                lastName: worker.lastName,
                position: worker.position
            });
        } else {
            resetValues({ ...initialFormState });
        }
        resetErrors();
        clearError();
    }, [isEditMode, worker, resetErrors, clearError, resetValues]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();
        if (!validateForm()) return;

        setIsButtonLoading(true);

        const success = isEditMode
            ? await handleUpdateWorker(workerId, values)
            : await handleCreateWorker(values);

        if (success) {
            toast.success(
                isEditMode
                    ? `Worker: ${values.firstName} updated successfully!`
                    : 'Worker created successfully!'
            );
            await refreshWorkers();
            onClose();
        } else {
            setIsButtonLoading(false);
        }
    };

    return (
        <Modal onClose={onClose}>
            <div>
                <h2 className="text-2xl font-bold mb-4">
                    {isEditMode ? 'Edit Worker' : 'Create New Worker'}
                </h2>

                {error && !Object.values(errors).some(e => e) && (
                    <ErrorMessage message={error} />
                )}

                <form onSubmit={handleSubmit}>
                    <FormField
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        placeholder="Enter worker's first name"
                        errorMessage={errors.firstName}
                    />
                    <FormField
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        placeholder="Enter worker's last name"
                        errorMessage={errors.lastName}
                    />
                    <FormField
                        label="Position"
                        type="select"
                        name="position"
                        value={values.position}
                        onChange={handleChange}
                        options={POSITION_OPTIONS}
                        errorMessage={errors.position}
                    />
                    <div className="mt-6 flex gap-3">
                        <ButtonCancel type="button" onClick={onClose}>
                            <FiX className="w-6 h-6" />
                        </ButtonCancel>
                        <Button type="button" onClick={resetForm}>
                            <FiRefreshCcw className="w-6 h-6" />
                        </Button>
                        <Button type="submit" disabled={isButtonLoading}>
                            {isButtonLoading
                                ? (isEditMode ? 'Updating...' : 'Creating...')
                                : (isEditMode ? 'Update Worker' : 'Create Worker')}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default WorkerFormModal;
