import React, { useState } from 'react';
import useSupplies from '../../../hooks/useSupplies';
import ErrorMessage from '../../atoms/ErrorMessage';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';

const SupplyListWithLowStock = () => {
    const { lowStockSupplies = [], isLoading, error } = useSupplies();
    const [nameFilter, setNameFilter] = useState('');

    const filteredSupplies = lowStockSupplies.filter((supply) =>
        nameFilter ? supply.name.toLowerCase().includes(nameFilter.toLowerCase()) : true
    );

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredSupplies, 5);

    if (isLoading) return <p className="text-gray-600 text-center">Loading...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="mx-auto mt-5 px-4 py-8 bg-white shadow-md rounded-lg max-w-screen-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Supplies with Low Stock</h2>
            <div className="mb-4">
                <Filter
                    type="input"
                    value={nameFilter}
                    onChange={setNameFilter}
                    placeholder="Filter by supply name"
                    className={"mb-4 w-2/4"}
                />
            </div>
            <div className="divide-y divide-gray-200">
                {getPaginatedData(filteredSupplies).map((supply) => (
                    <div
                        key={`${supply.id}-${supply.name}`}
                        className="py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-4 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{supply.name}</h3>
                        <p className="text-sm text-gray-500 mt-2">Low stock: {supply.quantity}</p>
                    </div>
                ))}
            </div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                />
            </div>
        </div>
    );    
};

export default SupplyListWithLowStock;
