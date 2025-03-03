import React, { useState, useMemo } from 'react';
import useWorkers from '../../../hooks/useWorkers';
import ErrorMessage from '../../atoms/ErrorMessage';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import ButtonCancel from '../../atoms/ButtonCancel';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiBriefcase, FiArrowLeft, FiMoreHorizontal } from 'react-icons/fi';
import CardData from '../../molecules/CardData';
import WorkerDetailsModal from './WorkerDetailsModal';
import { GetPositionColor as GetWorkerPositionColor } from '../../../utils/colorChangers';

const WorkerListWithoutJobs = () => {
    const { workers, isLoading, error, fetchData } = useWorkers('withoutJobs');
    const [nameFilter, setNameFilter] = useState('');
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const filteredWorkers = useMemo(() => {
        return workers.filter((worker) =>
            nameFilter ? worker.fullName.toLowerCase().includes(nameFilter.toLowerCase()) : true
        );
    }, [workers, nameFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredWorkers, 6);
    const paginatedData = useMemo(() => getPaginatedData(filteredWorkers), [getPaginatedData, filteredWorkers]);

    const handleBack = () => {
        navigate(location.state?.from || "/workers");
    };

    const handleDetails = (worker) => {
        setSelectedWorkerId(worker.id);
    };

    if (isLoading) return <div className="flex justify-center items-center h-64"></div>;
    if (error) return <ErrorMessage message={error} className="mx-auto max-w-screen-xl" />;

    return (
        <div className="mx-auto px-3 sm:px-4 py-6 sm:py-8">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-row items-center justify-start gap-4 mb-6">
                    <FiUser className="text-red-500 w-5 h-5" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Workers Without Assignments
                    </h1>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <Filter
                            type="input"
                            value={nameFilter}
                            onChange={setNameFilter}
                            placeholder="Search workers..."
                            icon="search"
                            className="w-full sm:w-80"
                        />
                        <span className="text-sm text-gray-500 self-end sm:self-auto">
                            Showing {filteredWorkers.length} workers
                        </span>
                    </div>

                    {filteredWorkers.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <div className="text-gray-400 mb-4 text-4xl sm:text-6xl">🤷</div>
                            <p className="text-gray-500 text-sm sm:text-base">
                                No workers found matching your criteria
                            </p>
                        </div>
                    ) : (
                        <>
                            <CardData
                                data={paginatedData}
                                keyProp="id"
                                actionIcon={FiMoreHorizontal}
                                actionTitle="View worker details"
                                onItemClick={handleDetails}
                                renderItem={(worker) => (
                                    <div>
                                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <FiUser className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                                    {worker.fullName}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-500 truncate">
                                                    ID: {worker.id}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm border-t pt-2">
                                            <div className="flex items-center gap-2">
                                                <FiBriefcase className={`text-gray-400 w-4 h-4 ${GetWorkerPositionColor(worker.position)}`} />
                                                <span className="text-gray-700">{worker.position}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />

                            <div className='mt-5'>
                                <ButtonCancel
                                    onClick={handleBack}
                                    className="flex items-center gap-2 sm:mt-0 text-sm sm:text-base"
                                >
                                    <FiArrowLeft className="w-4 h-4" />
                                    <span>Go Back</span>
                                </ButtonCancel>
                            </div>

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

            {selectedWorkerId && (
                <WorkerDetailsModal
                    workerId={selectedWorkerId}
                    onClose={() => setSelectedWorkerId(null)}
                    refreshWorkers={fetchData}
                />
            )}
        </div>
    );
};

export default WorkerListWithoutJobs;
