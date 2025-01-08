import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useWorkers from '../../../hooks/useWorkers';

const WorkerDelete = () => {
    const { workerId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteWorker } = useWorkers();

    const handleConfirm = async () => {
        await handleDeleteWorker(workerId);
        navigate('/workers');
    };

    const handleCancel = () => {
        navigate('/workers');
    };

    return (
        <DeleteConfirmation
            itemName={`Worker #${workerId}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
};

export default WorkerDelete;
