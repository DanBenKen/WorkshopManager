import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useSupplies from '../../../hooks/useSupplies';

const SupplyDelete = () => {
    const { supplyId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteSupply } = useSupplies();

    const handleConfirm = async () => {
        await handleDeleteSupply(supplyId);
        navigate('/supplies');
    };

    const handleCancel = () => {
        navigate('/supplies');
    };

    return (
        <DeleteConfirmation
            itemName={`Supply #${supplyId}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
};

export default SupplyDelete;
