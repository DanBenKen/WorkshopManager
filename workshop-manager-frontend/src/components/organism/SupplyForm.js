import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import useSupplies from '../../hooks/useSupplies';
import ErrorMessage from '../atoms/ErrorMessage';
import Button from '../atoms/Button';

const SupplyForm = () => {
    const { supplyId } = useParams();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState('');

    const { supply, handleCreateSupply, handleUpdateSupply, isLoading, error } = useSupplies(supplyId);
    const navigate = useNavigate();

    const isEditMode = !!supplyId;

    useEffect(() => {
        if (supply && supply.name) {
            setName(supply.name);
            setQuantity(supply.quantity);
            setType(supply.type);
        }
    }, [supply]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const supplyData = { name, quantity, type };

        if (isEditMode) {
            await handleUpdateSupply(supplyId, supplyData);
        } else {
            await handleCreateSupply(supplyData);
        }
        navigate('/supplies');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Supply' : 'Create New Supply'}</h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Name"
                    type="text"
                    id="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter supply name"
                />
                <FormField
                    label="Quantity"
                    type="number"
                    id="Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                />
                <FormField
                    label="Type"
                    type="text"
                    id="Type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Enter supply type"
                />
                <Button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Supply' : 'Create Supply')}
                </Button>
            </form>
        </div>
    );
};

export default SupplyForm;
