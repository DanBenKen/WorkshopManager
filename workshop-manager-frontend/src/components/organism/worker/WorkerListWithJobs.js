import useWorkers from '../../../hooks/useWorkers';
import ErrorMessage from '../../atoms/ErrorMessage';

const WorkerListWithJobs = () => {
    const { workers, isLoading, error } = useWorkers(null, 'withJobs');

    if (isLoading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Workers and Their Jobs</h2>
            {workers.map((worker) => (
                <div key={worker.workerId} className="mb-6 border-b pb-4">
                    <h3 className="text-xl font-semibold">{worker.workerName}</h3>
                    {worker.jobs.length > 0 ? (
                        <ul className="list-disc ml-6 mt-2">
                            {worker.jobs.map((job) => (
                                <li key={job.id}>
                                    {job.jobName} - {job.status}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No jobs assigned.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WorkerListWithJobs;
