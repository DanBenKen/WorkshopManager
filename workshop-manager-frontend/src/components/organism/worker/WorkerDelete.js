import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useWorkers from '../../../hooks/useWorkers';
import SuccessMessage from '../../atoms/SuccessMessage';

const WorkerDelete = () => {
    const { workerId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteWorker } = useWorkers(workerId);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleConfirm = async () => {
        setIsButtonLoading(true);

        const success = await handleDeleteWorker(workerId);

        if (success) {
            setSuccessMessage(`Worker #${workerId} deleted successfully!`);
            setTimeout(() => navigate('/workers'), 2000);
        } else {
            setIsButtonLoading(false);
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
                isButtonLoading={isButtonLoading}
            />
        </div>
    );
};

export default WorkerDelete;
