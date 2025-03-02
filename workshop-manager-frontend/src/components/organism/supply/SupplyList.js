import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiBox, FiMoreHorizontal, FiPlus } from 'react-icons/fi';
import useSupplies from '../../../hooks/useSupplies';
import usePagination from '../../../hooks/usePagination';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import { SUPPLY_OPTIONS } from '../../../constants/supplyType';
import CardData from '../../molecules/CardData';
import SupplyFormModal from './SupplyFormModal';
import SupplyDetailsModal from './SupplyDetailsModal';
import { toast } from 'react-toastify';

const SupplyList = () => {
    const { supplies, isLoading, error, handleAddMoreQuantity, fetchData } = useSupplies();
    const [nameFilter, setNameFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [selectedSupplyId, setSelectedSupplyId] = useState(null);
    const [showSupplyForm, setShowSupplyForm] = useState(false);
    const [quantityInputs, setQuantityInputs] = useState({});
    const navigate = useNavigate();

    const openSupplyForm = () => setShowSupplyForm(true);
    const closeSupplyForm = () => setShowSupplyForm(false);

    const filteredSupplies = useMemo(() => {
        return supplies.filter((supply) => {
            const matchesName = nameFilter ? supply.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
            const matchesType = typeFilter ? supply.type.includes(typeFilter) : true;
            return matchesName && matchesType;
        });
    }, [supplies, nameFilter, typeFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredSupplies, 6);
    const paginatedData = useMemo(() => getPaginatedData(filteredSupplies), [getPaginatedData, filteredSupplies]);

    const handleDetails = (supply) => {
        setSelectedSupplyId(supply.id);
    };

    const handleAddMore = (supply) => {
        const input = quantityInputs[supply.id];
        const quantity = parseInt(input, 10);
        if (!isNaN(quantity) && quantity > 0) {
            handleAddMoreQuantity(supply, quantity);
            setQuantityInputs(prev => ({ ...prev, [supply.id]: '' }));
        } else {
            if(quantity < 0){
                toast.warn('Enter quantity greater then 0');
            } else {
                toast.warn('Quantity must be a number.')
            }
        }
    };

    const renderSupplyItem = (supply) => {
        return (
            <>
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiPackage className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                            {supply.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                            ID: {supply.id}
                        </p>
                    </div>
                </div>
    
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm border-t pt-2">
                    <div className="flex items-center gap-2">
                        <FiBox className="text-gray-400 w-4 h-4" />
                        <span className="text-gray-700">Type: {supply.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiPackage className="text-gray-400 w-4 h-4" />
                        <span className="text-gray-700">Quantity: {supply.quantity}</span>
                    </div>
    
                    {/* Flex kontejner koji drži input i dugme */}
                    <div className="mt-2 flex items-center">
                        <input
                            type="number"
                            min="1"
                            value={quantityInputs[supply.id] || ''}
                            onChange={(e) =>
                                setQuantityInputs(prev => ({
                                    ...prev,
                                    [supply.id]: e.target.value,
                                }))
                            }
                            placeholder="Enter quantity to add"
                            className="border rounded px-2 py-1 me-2 text-sm w-2/3"
                        />
                        <button
                            onClick={() => handleAddMore(supply)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FiPlus className="w-5 h-5 text-blue-600" />
                        </button>
                    </div>
                </div>
            </>
        );
    };
    

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <FiPackage className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Supply Management</h1>
                </div>

                <Button
                    onClick={openSupplyForm}
                    className="flex items-center justify-center gap-2 sm:w-auto"
                    variant="primary"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>Add New Supply</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Button
                    onClick={() => navigate('/supplies/low-stock')}
                    className="flex items-center gap-2 justify-center"
                >
                    <FiBox className="w-4 h-4" />
                    <span>Low Stock Supplies</span>
                </Button>
            </div>

            <div className="bg-white rounded-xl mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Filter
                        type="select"
                        value={typeFilter}
                        onChange={setTypeFilter}
                        defaultOptionLabel="All Types"
                        options={SUPPLY_OPTIONS}
                        className="w-full sm:w-48"
                    />
                    <Filter
                        type="input"
                        value={nameFilter}
                        onChange={setNameFilter}
                        placeholder="Search supplies..."
                        icon="search"
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <ErrorMessage message={error} className="mx-auto" />
                ) : filteredSupplies.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                        <div className="text-gray-400 mb-4 text-4xl sm:text-6xl">📦</div>
                        <p className="text-gray-500 text-sm sm:text-base">
                            No supplies found matching your criteria
                        </p>
                    </div>
                ) : (
                    <>
                        <CardData
                            data={paginatedData}
                            renderItem={renderSupplyItem}
                            onItemClick={handleDetails}
                            actionIcon={FiMoreHorizontal}
                            actionTitle="View details"
                        />
                        {selectedSupplyId && (
                            <SupplyDetailsModal
                                supplyId={selectedSupplyId}
                                onClose={() => setSelectedSupplyId(null)}
                                refreshSupplies={fetchData}
                            />
                        )}

                        {showSupplyForm && (
                            <SupplyFormModal
                                supplyId={undefined}
                                onClose={closeSupplyForm}
                                refreshSupplies={fetchData}
                            />
                        )}
                        <div className="mt-6 sm:mt-8">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                goToPage={goToPage}
                                variant="numbered"
                                className="justify-center"
                                mobileBreakpoint="xs"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SupplyList;
