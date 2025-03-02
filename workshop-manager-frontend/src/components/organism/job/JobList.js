import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiActivity, FiPlus, FiMoreHorizontal, FiCheckCircle } from 'react-icons/fi';
import useJobs from '../../../hooks/useJobs';
import usePagination from '../../../hooks/usePagination';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import { STATUS_OPTIONS, JOB_STATUSES } from '../../../constants/jobStatus';
import CardData from '../../molecules/CardData';
import JobDetailsModal from './JobDetailsModal';
import { toast } from 'react-toastify';
import JobFormModal from './JobFormModal';

const JobList = () => {
    const { jobs, isLoading, error, handleSetCompleted, fetchData } = useJobs();
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedJobId, setSelectedJobId] = useState(null);
    const navigate = useNavigate();
    const [showJobForm, setShowJobForm] = useState(false);

    const openJobForm = () => setShowJobForm(true);
    const closeJobForm = () => setShowJobForm(false);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesName = nameFilter ? job.jobName.toLowerCase().includes(nameFilter.toLowerCase()) : true;
            const selectedStatus = Object.values(JOB_STATUSES).find(status => status.id === Number(statusFilter));
            const matchesStatus = selectedStatus ? job.status === selectedStatus.apiValue : true;
            return matchesName && matchesStatus;
        });
    }, [jobs, nameFilter, statusFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredJobs, 6);
    const paginatedData = getPaginatedData(filteredJobs);

    const handleDetails = (job) => {
        setSelectedJobId(job.id);
    };

    const handleComplete = (job) => {
        if (job.status === JOB_STATUSES.IN_PROGRESS.apiValue) {
            handleSetCompleted(job);
            toast.success(`Job: ${job.jobName} successfully completed!`);
        }
    };

    const getIconColor = (status) => {
        if (status === JOB_STATUSES.COMPLETED.apiValue) {
            return 'text-green-500';
        }
        if (status === JOB_STATUSES.IN_PROGRESS.apiValue) {
            return 'text-yellow-500';
        }
        return 'text-gray-400';
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <FiActivity className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Job Management</h1>
                </div>

                <Button onClick={openJobForm}
                    className="flex items-center justify-center gap-2 sm:w-auto"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>Add New Job</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Button
                    onClick={() => navigate('/jobs/list-in-progress')}
                    className="flex items-center gap-2 justify-center"
                >
                    <FiActivity className="w-4 h-4" />
                    <span>Jobs In Progress</span>
                </Button>
            </div>

            <div className="bg-white rounded-xl mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Filter
                        type="select"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        defaultOptionLabel="All Statuses"
                        options={STATUS_OPTIONS}
                        className="w-full sm:w-48"
                        id="status-filter"
                        name="status"
                        autocomplete="on"
                    />
                    <Filter
                        type="input"
                        value={nameFilter}
                        onChange={setNameFilter}
                        placeholder="Search jobs..."
                        icon="search"
                        id="name-filter"
                        name="name"
                        autocomplete="on"
                    />
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <ErrorMessage message={error} className="mx-auto" />
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                        <div className="text-gray-400 mb-4 text-4xl sm:text-6xl">⚙️</div>
                        <p className="text-gray-500 text-sm sm:text-base">No jobs found matching your criteria</p>
                    </div>
                ) : (
                    <>
                        <CardData

                            data={paginatedData}
                            keyProp="id"
                            actionIcon={FiMoreHorizontal}
                            actionTitle="View details"
                            onItemClick={handleDetails}
                            renderItem={(job) => (
                                <div>
                                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FiActivity className={`w-5 h-5 sm:w-6 sm:h-6 ${getIconColor(job.status)}`} />
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

                                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm border-t py-2">
                                        <div className="flex items-center gap-2">
                                            <FiActivity className={`text-gray-400 w-4 h-4 ${getIconColor(job.status)}`} />
                                            <span className={`text-gray-700 ${getIconColor(job.status)}`}>{job.status}</span>
                                        </div>
                                    </div>

                                    {job.status === JOB_STATUSES.IN_PROGRESS.apiValue && (
                                        <button
                                            onClick={() => handleComplete(job)}
                                            className="absolute bottom-2 right-10 p-1 hover:bg-green-100 rounded-full transition-colors"
                                            title="Complete Job"
                                        >
                                            <FiCheckCircle className="w-5 h-5 text-green-500" />
                                        </button>
                                    )}
                                </div>
                            )}
                        />
                        {selectedJobId && (
                            <JobDetailsModal
                                jobId={selectedJobId}
                                onClose={() => setSelectedJobId(null)}
                                refreshJobs={fetchData}
                            />
                        )}

                        {showJobForm && (
                            <JobFormModal
                                jobId={undefined}
                                onClose={closeJobForm}
                                refreshJobs={fetchData}
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

export default JobList;
