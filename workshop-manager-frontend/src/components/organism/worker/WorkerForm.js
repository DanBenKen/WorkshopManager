import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../../molecules/FormField';
import useWorkers from '../../../hooks/useWorkers';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import ButtonCancel from '../../atoms/ButtonCancel';
import useValidation from '../../../hooks/useValidation';
import { validateWorkerForm } from '../../../utils/validators';

const WorkerForm = () => {
    const { workerId } = useParams();
    const { worker, fetchWorkerById, handleCreateWorker, handleUpdateWorker, isLoading, error } = useWorkers();
    const navigate = useNavigate();

    const isEditMode = !!workerId;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');

    const {
        values: { firstName: formFirstName, lastName: formLastName, position: formPosition },
        errors,
        handleChange,
        resetErrors,
        validateForm
    } = useValidation(
        { firstName, lastName, position },
        validateWorkerForm
    );

    useEffect(() => {
        if (isEditMode && !worker) {
            fetchWorkerById(workerId);
        }
    }, [workerId, isEditMode, worker, fetchWorkerById]);

    useEffect(() => {
        if (worker) {
            setFirstName(worker.firstName);
            setLastName(worker.lastName);
            setPosition(worker.position);
        }
    }, [worker]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        resetErrors();
        const isValidForm = validateForm();
        if (!isValidForm) return;

        const workerData = {
            firstName: formFirstName,
            lastName: formLastName,
            position: formPosition,
        };

        const success = isEditMode
            ? await handleUpdateWorker(workerId, workerData)
            : await handleCreateWorker(workerData);

        if (success) {
            navigate('/workers');
        }
    }, [validateForm, resetErrors, handleCreateWorker, handleUpdateWorker, navigate, isEditMode, workerId, formFirstName, formLastName, formPosition]);

    const handleBack = useCallback(() => {
        if (isEditMode && worker) {
            navigate(`/workers/details/${worker.id}`);
        } else {
            navigate('/workers');
        }
    }, [navigate, isEditMode, worker]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Worker' : 'Create New Worker'}</h2>
            {error && !Object.values(errors).some((e) => e) && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <FormField
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formFirstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    errorMessage={errors.firstName}
                />
                <FormField
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formLastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    errorMessage={errors.lastName}
                />
                <FormField
                    label="Position"
                    type="text"
                    name="position"
                    value={formPosition}
                    onChange={handleChange}
                    placeholder="Enter position"
                    errorMessage={errors.position}
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : isEditMode ? 'Update Worker' : 'Create Worker'}
                </Button>
            </form>

            <ButtonCancel
                type="button"
                disabled={isLoading}
                onClick={handleBack}
                className="mt-2"
            >
                Go Back
            </ButtonCancel>
        </div>
    );
};

export default WorkerForm;