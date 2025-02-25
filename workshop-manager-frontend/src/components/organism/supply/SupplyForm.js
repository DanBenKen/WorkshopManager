import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../../molecules/FormField';
import useSupplies from '../../../hooks/useSupplies';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import ButtonCancel from '../../atoms/ButtonCancel';
import useValidation from '../../../hooks/useValidation';
import { validateSupplyForm } from '../../../utils/validators';

const SupplyForm = () => {
    const { supplyId } = useParams();
    const { supply, fetchSupplyById, handleCreateSupply, handleUpdateSupply, isLoading, error } = useSupplies();
    const navigate = useNavigate();

    const isEditMode = !!supplyId;

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState('');

    const {
        values: { name: formName, quantity: formQuantity, type: formType },
        errors,
        handleChange,
        resetErrors,
        validateForm
    } = useValidation(
        { name, quantity, type },
        validateSupplyForm
    );

    useEffect(() => {
        if (isEditMode) {
            if (!supply) {
                fetchSupplyById(supplyId);
            } else {
                setName(supply.name);
                setQuantity(supply.quantity);
                setType(supply.type);
            }
        }
    }, [supplyId, isEditMode, supply, fetchSupplyById]);    

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();
        const isValidForm = validateForm();
        if (!isValidForm) return;
    
        const supplyData = {
            name: formName,
            quantity: parseInt(formQuantity, 10),
            type: formType,
        };

        const success = isEditMode
            ? await handleUpdateSupply(supplyId, supplyData)
            : await handleCreateSupply(supplyData);

        if (success) {
            navigate('/supplies');
        }
    };
    
    const handleBack = () => {
        if (isEditMode && supply) {
            navigate(`/supplies/details/${supply.id}`);
        } else {
            navigate('/supplies');
        }
    };    

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Supply' : 'Create New Supply'}</h2>
            {error && !Object.values(errors).some((e) => e) && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Name"
                    type="text"
                    name="name"
                    value={formName}
                    onChange={handleChange}
                    placeholder="Enter supply name"
                    errorMessage={errors.name}
                />
                <FormField
                    label="Quantity"
                    type="number"
                    name="quantity"
                    value={formQuantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    errorMessage={errors.quantity}
                />
                <FormField
                    label="Type"
                    type="text"
                    name="type"
                    value={formType}
                    onChange={handleChange}
                    placeholder="Enter supply type"
                    errorMessage={errors.type}
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : isEditMode ? 'Update Supply' : 'Create Supply'}
                </Button>
            </form>

            <ButtonCancel
                type="button"
                disabled={isLoading}
                onClick={handleBack}
                className="mt-2"
            >
                Go Back
            </ButtonCancel>
        </div>
    );
};

export default SupplyForm;
