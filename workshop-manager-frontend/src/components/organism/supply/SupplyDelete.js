import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useSupplies from '../../../hooks/useSupplies';
import SuccessMessage from '../../atoms/SuccessMessage';

const SupplyDelete = () => {
    const { supplyId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteSupply } = useSupplies();

    const [successMessage, setSuccessMessage] = useState('');

    const handleConfirm = async () => {
        const success = await handleDeleteSupply(supplyId);
        
        if (success) {
            setSuccessMessage(`Supply #${supplyId} deleted successfully!`);
            setTimeout(() => navigate('/supplies'), 2000);
        }
    };
    
    const handleCancel = () => {
        navigate(`/supplies/details/${supplyId}`);
    };
    
    return (
        <div>
            <SuccessMessage message={successMessage} />
            
            <DeleteConfirmation
                itemName={`Supply #${supplyId}`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default SupplyDelete;
