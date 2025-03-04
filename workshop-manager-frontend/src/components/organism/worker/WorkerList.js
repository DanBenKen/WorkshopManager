import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPlus, FiBriefcase, FiUserPlus, FiMoreHorizontal } from 'react-icons/fi';
import useWorkers from '../../../hooks/useWorkers';
import usePagination from '../../../hooks/usePagination';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import CardData from '../../molecules/CardData';
import { POSITION_OPTIONS } from '../../../constants/workerPosition';
import WorkerDetailsModal from './WorkerDetailsModal';
import WorkerFormModal from './WorkerFormModal';
import { GetPositionColor } from '../../../utils/colorChangers';

const WorkersList = () => {
    const { workers, isLoading, error, fetchData } = useWorkers('all');
    const [nameFilter, setNameFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);
    const [showWorkerForm, setshowWorkerForm] = useState(false);
    const navigate = useNavigate();

    const openWorkerForm = () => setshowWorkerForm(true);
    const closeWorkerForm = () => setshowWorkerForm(false);

    const filteredWorkers = useMemo(() => workers.filter((worker) => {
        const matchesName = nameFilter ? worker.fullName.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesPosition = positionFilter ? worker.position.includes(positionFilter) : true;
        return matchesName && matchesPosition;
    }), [workers, nameFilter, positionFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredWorkers, 6);
    const paginatedData = useMemo(() => getPaginatedData(filteredWorkers), [getPaginatedData, filteredWorkers]);

    const handleDetails = (worker) => {
        setSelectedWorkerId(worker.id);
    };

    const renderWorkerItem = (worker) => (
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
              <FiBriefcase className={`w-4 h-4 ${GetPositionColor(worker.position)}`} />
              <span className="text-gray-700">{worker.position}</span>
            </div>
          </div>
        </div>
      );

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <FiUser className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Worker Management</h1>
                </div>

                <Button
                    onClick={openWorkerForm}
                    className="flex items-center justify-center gap-2 sm:w-auto"
                    variant="primary"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>Add New Worker</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Button
                    onClick={() => navigate('/workers/with-jobs')}
                    className="flex items-center gap-2 justify-center"
                    variant="secondary"
                >
                    <FiBriefcase className="w-4 h-4" />
                    <span>With Assignments</span>
                </Button>
                <Button
                    onClick={() => navigate('/workers/without-jobs')}
                    className="flex items-center gap-2 justify-center"
                    variant="secondary"
                >
                    <FiUserPlus className="w-4 h-4" />
                    <span>Available Workers</span>
                </Button>
            </div>

            <div className="bg-white rounded-xl mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Filter
                        id="selectId"
                        type="select"
                        value={positionFilter}
                        onChange={setPositionFilter}
                        defaultOptionLabel="All Positions"
                        options={POSITION_OPTIONS}
                        className="w-full sm:w-48"
                    />
                    <Filter
                        id="searchId"
                        type="input"
                        value={nameFilter}
                        onChange={setNameFilter}
                        placeholder="Search workers..."
                        icon="search"
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <ErrorMessage message={error} className="mx-auto" />
                ) : filteredWorkers.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                        <div className="text-gray-400 mb-4 text-4xl sm:text-6xl">👤</div>
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
                            actionTitle="View details"
                            onItemClick={handleDetails}
                            renderItem={renderWorkerItem}
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
                    </>
                )}
            </div>
            {selectedWorkerId && (
                <WorkerDetailsModal
                    workerId={selectedWorkerId}
                    onClose={() => setSelectedWorkerId(null)}
                    refreshWorkers={fetchData}
                />
            )}

            {showWorkerForm && (
                <WorkerFormModal
                    workerId={undefined}
                    onClose={closeWorkerForm}
                    refreshWorkers={fetchData}
                />
            )}
        </div>
    );
};

export default WorkersList;
