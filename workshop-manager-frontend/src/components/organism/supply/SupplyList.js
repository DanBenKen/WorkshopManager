import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useSupplies from '../../../hooks/useSupplies';
import List from '../../molecules/List';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';

const SupplyList = () => {
    const { supplies, isLoading, error, handleAddMoreQuantity } = useSupplies();
    
    const [nameFilter, setNameFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const navigate = useNavigate();

    const filteredSupplies = supplies.filter((supply) => {
        const matchesName = nameFilter ? supply.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesType = typeFilter ? supply.type.toLowerCase().includes(typeFilter.toLowerCase()) : true;
        return matchesName && matchesType;
    });

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredSupplies, 5);

    const handleEdit = (supply) => {
        navigate(`/supplies/edit/${supply.id}`);
    };

    const handleDetails = (supply) => {
        navigate(`/supplies/details/${supply.id}`);
    };

    const handleDelete = (supply) => {
        navigate(`/supplies/delete/${supply.id}`);
    };

    const onAddQuantity = (supply) => ({
        label: 'Add Quantity',
        onClick: (quantity) => handleAddMore(supply, quantity),
        requiresInput: true,
    });

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

            <Filter
                type="input"
                value={nameFilter}
                onChange={setNameFilter}
                placeholder="Filter by name"
                className={"mb-4 w-1/4"}
            />

            <Filter
                type="input"
                value={typeFilter}
                onChange={setTypeFilter}
                placeholder="Filter by type"
            />

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <>
                    <List
                        data={getPaginatedData(filteredSupplies)}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDetails={handleDetails}
                        getCustomAction={onAddQuantity}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={goToPage}
                    />
                </>
            )}
        </div>
    );
};

export default SupplyList;
