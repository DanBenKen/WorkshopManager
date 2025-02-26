import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useSupplies from '../../../hooks/useSupplies';
import List from '../../molecules/List';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import { SUPPLY_OPTIONS } from '../../../constants/supplyType';

const SupplyList = () => {
    const { supplies, isLoading, error, handleAddMoreQuantity } = useSupplies();
    const [nameFilter, setNameFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const navigate = useNavigate();

    const filteredSupplies = useMemo(() => {
        return supplies.filter((supply) => {
            const matchesName = nameFilter ? supply.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
            const matchesType = typeFilter ? supply.type.includes(typeFilter) : true;
            return matchesName && matchesType;
        });
    }, [supplies, nameFilter, typeFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredSupplies, 5);
    const paginatedData = useMemo(() => getPaginatedData(filteredSupplies), [getPaginatedData, filteredSupplies]);

    const handleDetails = (supply) => {
        navigate(`/supplies/details/${supply.id}`);
    };

    const handleAddMore = (supply, quantity) => {
        handleAddMoreQuantity(supply, quantity);
    };

    const onAddQuantity = (supply) => ({
        label: 'Add Quantity',
        onClick: (quantity) => handleAddMore(supply, quantity),
        requiresInput: true,
    });

    const columns = [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Quantity', field: 'quantity' },
        { label: 'Type', field: 'type' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Supplies</h2>

            <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4 mb-4">
                <Button className="w-full md:w-auto" onClick={() => navigate('/supplies/create')}>
                    Add New Supply
                </Button>
                <div className='flex flex-col sm:flex-row gap-4 w-full'>
                    <Button className="md:w-auto" onClick={() => navigate('/supplies/low-stock')}>
                        Low Stock Supplies
                    </Button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
                <Filter
                    type="select"
                    value={typeFilter}
                    onChange={setTypeFilter}
                    defaultOptionLabel='Type'
                    options={SUPPLY_OPTIONS}
                    className="w-full md:w-auto sm:w-1/3"
                />
                <Filter
                    type="input"
                    value={nameFilter}
                    onChange={setNameFilter}
                    placeholder="Filter by name"
                    className="w-full md:w-auto sm:w-1/3"
                />
            </div>

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : filteredSupplies.length === 0 ? (
                <p className="mt-3 text-gray-600 text-center">No results found</p>
            ) : (
                <div className="overflow-x-auto">
                    <List
                        data={paginatedData}
                        columns={columns}
                        onDetails={handleDetails}
                        getCustomAction={onAddQuantity}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={goToPage}
                    />
                </div>
            )}
        </div>
    );
};

export default SupplyList;
