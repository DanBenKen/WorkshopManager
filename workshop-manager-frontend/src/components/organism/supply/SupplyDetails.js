import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Details from '../../molecules/Details';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import useSupplies from '../../../hooks/useSupplies';
import DetailsButtons from '../../molecules/DetailsButtons';

const SupplyDetails = () => {
    const { supplyId } = useParams();
    const { supply, isLoading, error, fetchSupplyById } = useSupplies();
    const navigate = useNavigate();

    useEffect(() => {
        if (supplyId && !supply) {
            fetchSupplyById(supplyId);
        }
    }, [supplyId, supply, fetchSupplyById]);

    const handleBack = useCallback(() => {
        navigate(`/supplies/`);
    }, [navigate]);

    const handleEdit = useCallback((supply) => {
        navigate(`/supplies/edit/${supply.id}`);
    }, [navigate]);

    const handleDelete = useCallback((supply) => {
        navigate(`/supplies/delete/${supply.id}`);
    }, [navigate]);

    if (error) {
        return (
            <div className="mx-auto px-4 py-8">
                <ErrorMessage message={error} />
                <Button className="mt-4" onClick={handleBack}>Back to List</Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="mx-auto px-4 py-8">
                <Text content="Loading..." />
            </div>
        );
    }

    if (!supply) {
        return (
            <div className="mx-auto px-4 py-8">
                <Text content="No details found." />
                <Button className="mt-4" onClick={handleBack}>Back to List</Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-6 py-8 bg-white rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Supply Details</h2>

            <div className="space-y-6">
                {Object.entries(supply).map(([key, value]) => (
                    <Details key={key} label={key} value={value} />
                ))}
            </div>

            <DetailsButtons
                onBack={handleBack}
                onEdit={() => handleEdit(supply)}
                onDelete={() => handleDelete(supply)}
            />
        </div>
    );
};

export default SupplyDetails;
