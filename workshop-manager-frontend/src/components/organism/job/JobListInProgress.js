import React, { useState, useMemo } from 'react';
import useJobs from '../../../hooks/useJobs';
import ErrorMessage from '../../atoms/ErrorMessage';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import usePagination from '../../../hooks/usePagination';
import ButtonCancel from '../../atoms/ButtonCancel';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiActivity, FiArrowLeft, FiMoreHorizontal, FiClock } from 'react-icons/fi';
import CardData from '../../molecules/CardData';
import JobDetailsModal from './JobDetailsModal';

const JobListInProgress = () => {
    const { jobs, isLoading, error } = useJobs(null, 'all');
    const [nameFilter, setNameFilter] = useState('');
    const [selectedJobId, setSelectedJobId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) =>
            job.status === 'In Progress' &&
            (nameFilter ? job.jobName.toLowerCase().includes(nameFilter.toLowerCase()) : true)
        );
    }, [jobs, nameFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredJobs, 6);
    const paginatedData = useMemo(() => getPaginatedData(filteredJobs), [getPaginatedData, filteredJobs]);

    const handleBack = () => {
        navigate(location.state?.from || "/jobs");
    };

    const handleDetailsClick = (job) => {
        setSelectedJobId(job.id);
    };

    if (isLoading) return <div className="flex justify-center items-center h-64"></div>;
    if (error) return <ErrorMessage message={error} className="mx-auto max-w-screen-xl" />;

    return (
        <div className="mx-auto px-3 sm:px-4 py-6 sm:py-8 min-h-screen">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-row items-center justify-start gap-4 mb-6">
                    <FiActivity className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Jobs In Progress
                    </h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <Filter
                            type="input"
                            value={nameFilter}
                            onChange={setNameFilter}
                            placeholder="Search jobs..."
                            icon="search"
                            className="w-full sm:w-80"
                        />
                        <span className="text-sm text-gray-500 self-end sm:self-auto">
                            Showing {filteredJobs.length} active jobs
                        </span>
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <div className="text-gray-400 mb-4 text-4xl sm:text-6xl">⏳</div>
                            <p className="text-gray-500 text-sm sm:text-base">
                                No jobs currently in progress
                            </p>
                        </div>
                    ) : (
                        <>
                            <CardData
                                data={paginatedData}
                                keyProp="id"
                                actionIcon={FiMoreHorizontal}
                                actionTitle="View job details"
                                onItemClick={handleDetailsClick}
                                renderItem={(job) => (
                                    <div>
                                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <FiClock className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                                    {job.jobName}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-500 truncate">
                                                    ID: {job.id}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm border-t pt-2">
                                            <div className="flex items-center gap-2">
                                                <FiActivity className="text-gray-400 w-4 h-4" />
                                                <span className="text-gray-700">
                                                    Status: {job.status}
                                                </span>
                                            </div>
                                            {job.deadline && (
                                                <div className="flex items-center gap-2">
                                                    <FiClock className="text-gray-400 w-4 h-4" />
                                                    <span className="text-gray-700">
                                                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            />

                            {selectedJobId && (
                                <JobDetailsModal
                                    jobId={selectedJobId}
                                    onClose={() => setSelectedJobId(null)}
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
        </div>
    );
};

export default JobListInProgress;
