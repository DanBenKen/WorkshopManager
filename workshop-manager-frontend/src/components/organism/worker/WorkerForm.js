import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../../molecules/FormField';
import useWorkers from '../../../hooks/useWorkers';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import ButtonCancel from '../../atoms/ButtonCancel';

const WorkerForm = () => {
    const { workerId } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');

    const { worker, handleCreateWorker, handleUpdateWorker, isLoading, error } = useWorkers(workerId);
    const navigate = useNavigate();

    const isEditMode = !!workerId;

    useEffect(() => {
        if (worker) {
            setFirstName(worker.firstName);
            setLastName(worker.lastName);
            setPosition(worker.position);
        }
    }, [worker]);

    const handleBack = (worker) => {
        if (isEditMode) {
            navigate(`/workers/details/${worker.id}`);
        } else {
            navigate('/workers');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workerData = { firstName, lastName, position };

        if (isEditMode) {
            await handleUpdateWorker(workerId, workerData);
        } else {
            await handleCreateWorker(workerData);
        }
        navigate('/workers');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Worker' : 'Create New Worker'}</h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <FormField
                    label="First Name"
                    type="text"
                    id="FirstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                />
                <FormField
                    label="Last Name"
                    type="text"
                    id="LastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                />
                <FormField
                    label="Position"
                    type="text"
                    id="Position"
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Enter position"
                />



                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-500 hover:bg-green-600"
                >
                    {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Worker' : 'Create Worker')}
                </Button>
            </form>

            <ButtonCancel
                type="button"
                className="mt-2"
                disabled={isLoading}
                onClick={() => handleBack(worker)}
            >
                Go Back
            </ButtonCancel>
        </div>
    );
};

export default WorkerForm;
