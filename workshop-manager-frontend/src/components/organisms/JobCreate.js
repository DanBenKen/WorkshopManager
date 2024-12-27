import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useJobs from '../../hooks/useJobs';
import JobForm from '../../components/molecules/JobMolecules/JobForm';

const JobCreate = () => {
    const navigate = useNavigate();
    const [newJob, setNewJob] = useState({
        jobName: '',
        description: '',
        workerId: '',
        supplyId: '',
        status: 0,
    });

    const { createJob, loading, error } = useJobs();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob((prevJob) => ({
            ...prevJob,
            [name]: value,
        }));
    };

    const handleJobSubmit = async (e) => {
        e.preventDefault();

        if (!newJob.jobName || !newJob.description || !newJob.workerId || !newJob.supplyId || newJob.status === '') {
            alert('Please fill all fields correctly');
            return;
        }

        try {
            const jobToCreate = {
                ...newJob,
                workerId: Number(newJob.workerId),
                supplyId: Number(newJob.supplyId),
            };

            await createJob(jobToCreate);
            alert('Job created successfully!');
            navigate('/job');
        } catch (err) {
            console.error('Failed to create job:', err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-center mb-8">Jobs</h1>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-2xl font-semibold mb-4">Create a New Job</h2>
                {loading && <p className="text-blue-500 mb-4">Processing...</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <JobForm
                    job={newJob}
                    onChange={handleInputChange}
                    onSubmit={handleJobSubmit}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default JobCreate;
