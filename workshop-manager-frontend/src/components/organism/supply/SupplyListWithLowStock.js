import React, { useState, useMemo } from 'react';
import useSupplies from '../../../hooks/useSupplies';
import ErrorMessage from '../../atoms/ErrorMessage';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import ButtonCancel from '../../atoms/ButtonCancel';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPackage, FiMoreHorizontal, FiBox } from 'react-icons/fi';
import CardData from '../../molecules/CardData';
import { GetQuantityColor, GetSupplyTypeColor } from '../../../utils/colorChangers';
import SupplyDetailsModal from './SupplyDetailsModal';

const SupplyListWithLowStock = () => {
    const { lowStockSupplies = [], isLoading, error, fetchData } = useSupplies();
    const [nameFilter, setNameFilter] = useState('');
    const [selectedSupplyId, setSelectedSupplyId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const filteredSupplies = useMemo(() => {
        return lowStockSupplies.filter((supply) =>
            nameFilter ? supply.name.toLowerCase().includes(nameFilter.toLowerCase()) : true
        );
    }, [lowStockSupplies, nameFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredSupplies, 6);
    const paginatedData = useMemo(() => getPaginatedData(filteredSupplies), [getPaginatedData, filteredSupplies]);

    const handleBack = () => {
        navigate(location.state?.from || "/supplies");
    };

    const handleDetailsClick = (supply) => {
        setSelectedSupplyId(supply.id);
    };

    if (isLoading) 
        return <div className="flex justify-center items-center h-64"></div>;
    if (error) 
        return <ErrorMessage message={error} className="mx-auto max-w-screen-xl" />;

    return (
        <div className="mx-auto px-3 sm:px-4 py-6 sm:py-8">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-row items-center justify-start gap-4 mb-6">
                    <FiPackage className="text-yellow-500 w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Supplies with Low Stock
                    </h1>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <Filter
                            type="input"
                            value={nameFilter}
                            onChange={setNameFilter}
                            placeholder="Search supplies..."
                            icon="search"
                            id="search"
                            className="w-full sm:w-80"
                        />
                        <span className="text-sm text-gray-500 self-end sm:self-auto">
                            Showing {filteredSupplies.length} low stock items
                        </span>
                    </div>

                    {filteredSupplies.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <div className="text-gray-400 mb-4 text-4xl sm:text-6xl">📦</div>
                            <p className="text-gray-500 text-sm sm:text-base">
                                All supplies are well stocked
                            </p>
                        </div>
                    ) : (
                        <>
                            <CardData
                                data={paginatedData}
                                keyProp="id"
                                actionIcon={FiMoreHorizontal}
                                actionTitle="View supply details"
                                onItemClick={handleDetailsClick}
                                renderItem={(supply) => (
                                    <div>
                                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                                <FiBox className="text-yellow-600 w-5 h-5 sm:w-6 sm:h-6" />
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
                                                <FiBox className={`text-gray-400 w-4 h-4 ${GetSupplyTypeColor(supply.type)}`} />
                                                <span className="text-gray-700">Type: {supply.type}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiPackage className={`text-gray-400 w-4 h-4 ${GetQuantityColor(supply.quantity)}`} />
                                                <span className="text-gray-700">Quantity: {supply.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />

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

                            <div className="mt-5">
                                <ButtonCancel
                                    onClick={handleBack}
                                    className="flex items-center gap-2 text-sm sm:text-base"
                                >
                                    <FiArrowLeft className="w-4 h-4" />
                                    <span>Go Back</span>
                                </ButtonCancel>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {selectedSupplyId && (
                <SupplyDetailsModal
                    supplyId={selectedSupplyId}
                    onClose={() => setSelectedSupplyId(null)}
                    refreshSupplies={fetchData}
                />
            )}
        </div>
    );
};

export default SupplyListWithLowStock;
