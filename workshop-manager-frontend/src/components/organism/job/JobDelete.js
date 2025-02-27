import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useJobs from '../../../hooks/useJobs';
import SuccessMessage from '../../atoms/SuccessMessage';

const JobDelete = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteJob } = useJobs();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleConfirm = async () => {
        setIsButtonLoading(true);

        const success = await handleDeleteJob(jobId);

        if (success) {
            setSuccessMessage(`Job #${jobId} deleted successfully!`);
            setTimeout(() => navigate('/jobs'), 2000);
        } else {
            setIsButtonLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/jobs/details/${jobId}`);
    };

    return (
        <div>
            <SuccessMessage message={successMessage} />

            <DeleteConfirmation
                itemName={`Job #${jobId}`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isButtonLoading={isButtonLoading}
            />
        </div>
    );
};

export default JobDelete;
