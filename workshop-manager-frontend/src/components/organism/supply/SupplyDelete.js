import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useSupplies from '../../../hooks/useSupplies';

const SupplyDelete = () => {
    const { supplyId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteSupply } = useSupplies();

    const handleConfirm = useCallback(async () => {
        await handleDeleteSupply(supplyId);
        navigate('/supplies');
    }, [handleDeleteSupply, supplyId, navigate]);

    const handleCancel = useCallback(() => {
        navigate(`/supplies/details/${supplyId}`);
    }, [navigate, supplyId]);

    return (
        <DeleteConfirmation
            itemName={`Supply #${supplyId}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
};

export default SupplyDelete;
