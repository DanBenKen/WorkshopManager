import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useSupplies from '../../../hooks/useSupplies';
import List from '../../molecules/List';

const SupplyList = () => {
    const { supplies, isLoading, error, handleAddMoreQuantity } = useSupplies();
    const navigate = useNavigate();

    const handleEdit = (supply) => {
        navigate(`/supplies/edit/${supply.id}`);
    };

    const handleDetails = (supply) => {
        navigate(`/supplies/details/${supply.id}`);
    };

    const handleDelete = (supply) => {
        navigate(`/supplies/delete/${supply.id}`);
    };

    const handleAddMore = (supply, quantity) => {
        handleAddMoreQuantity(supply, quantity);
    };

    const columns = [
        { label: 'Name', field: 'name' },
        { label: 'Quantity', field: 'quantity' },
        { label: 'Type', field: 'type' },
    ];

    return (
        <div className="mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Supplies</h2>
            <Link to="/supplies/create" className="inline-block mb-4">
                <Button>Add New Supply</Button>
            </Link>

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <List
                    data={supplies}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDetails={handleDetails}
                    onAddMore={handleAddMore}
                />
            )}
        </div>
    );
};

export default SupplyList;
