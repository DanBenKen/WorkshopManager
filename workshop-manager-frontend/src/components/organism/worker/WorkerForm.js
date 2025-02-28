import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WORKER_POSITIONS, POSITION_OPTIONS } from '../../../constants/workerPosition';
import FormField from '../../molecules/FormField';
import useWorkers from '../../../hooks/useWorkers';
import ErrorMessage from '../../atoms/ErrorMessage';
import SuccessMessage from '../../atoms/SuccessMessage';
import Button from '../../atoms/Button';
import ButtonCancel from '../../atoms/ButtonCancel';
import useValidation from '../../../hooks/useValidation';
import { validateWorkerForm } from '../../../utils/validators';

const WorkerForm = () => {
    const { workerId } = useParams();
    const { worker, handleCreateWorker, handleUpdateWorker, error, fetchWorkerById } = useWorkers('all');
    const navigate = useNavigate();
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const isEditMode = !!workerId;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState(WORKER_POSITIONS.MECHANIC.apiValue);
    const [successMessage, setSuccessMessage] = useState('');

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
        if (workerId) {
            fetchWorkerById(workerId);
        }
    }, [workerId, fetchWorkerById]);

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
        setSuccessMessage('');
        const isValidForm = validateForm();
        if (!isValidForm) return;

        const workerData = {
            firstName: formFirstName,
            lastName: formLastName,
            position: formPosition,
        };

        setIsButtonLoading(true);

        const success = isEditMode
            ? await handleUpdateWorker(workerId, workerData)
            : await handleCreateWorker(workerData);

        if (success) {
            setSuccessMessage(isEditMode ? 'Worker updated successfully!' : 'Worker created successfully!');
            setTimeout(() => navigate('/workers'), 2000);
        } else {
            setIsButtonLoading(false);
        }
    }, [validateForm, resetErrors, handleCreateWorker, handleUpdateWorker, navigate, isEditMode, workerId, formFirstName, formLastName, formPosition]);

    const handleBack = () => {
        if (isEditMode && worker) {
            navigate(`/workers/details/${worker.id}`);
        } else {
            navigate('/workers');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Worker' : 'Create New Worker'}</h2>

            {successMessage && <SuccessMessage message={successMessage} />}
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
                    type="select"
                    name="position"
                    value={formPosition}
                    onChange={handleChange}
                    options={POSITION_OPTIONS}
                />
                <Button type="submit" disabled={isButtonLoading}>
                    {isButtonLoading ? (isEditMode ? 'Updating...' : 'Creating...') : isEditMode ? 'Update Worker' : 'Create Worker'}
                </Button>
            </form>

            <ButtonCancel
                type="button"
                disabled={isButtonLoading}
                onClick={handleBack}
                className="mt-2">
                Go Back
            </ButtonCancel>
        </div>
    );
};

export default WorkerForm;
