import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useWorkers from '../../../hooks/useWorkers';
import SuccessMessage from '../../atoms/SuccessMessage';

const WorkerDelete = () => {
    const { workerId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteWorker } = useWorkers(workerId);
    const [successMessage, setSuccessMessage] = useState('');

    const handleConfirm = async () => {
        const success = await handleDeleteWorker(workerId);

        if (success) {
            setSuccessMessage(`Worker #${workerId} deleted successfully!`);
            setTimeout(() => navigate('/workers'), 2000);
        }
    };

    const handleCancel = () => {
        navigate(`/workers/details/${workerId}`);
    };

    return (
        <div>
            <SuccessMessage message={successMessage} />

            <DeleteConfirmation
                itemName={`Worker #${workerId}`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default WorkerDelete;
