import React, { useState } from 'react';
import useJobs from '../../hooks/useJobs';
import Button from '../../components/atoms/Button';

const JobCreatePage = () => {
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
                <form onSubmit={handleJobSubmit}>
                    <div className="mb-4">
                        <label htmlFor="jobName" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            name="jobName"
                            value={newJob.jobName}
                            onChange={handleInputChange}
                            placeholder="Job Title"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
                        <textarea
                            name="description"
                            value={newJob.description}
                            onChange={handleInputChange}
                            placeholder="Job Description"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="workerId" className="block text-sm font-medium text-gray-700">Worker ID</label>
                        <input
                            type="number"
                            name="workerId"
                            value={newJob.workerId}
                            onChange={handleInputChange}
                            placeholder="Worker ID"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="supplyId" className="block text-sm font-medium text-gray-700">Supply ID</label>
                        <input
                            type="number"
                            name="supplyId"
                            value={newJob.supplyId}
                            onChange={handleInputChange}
                            placeholder="Supply ID"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Job Status</label>
                        <select
                            name="status"
                            value={newJob.status}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={0}>Not Started</option>
                            <option value={1}>In Progress</option>
                            <option value={2}>Completed</option>
                            <option value={3}>Cancelled</option>
                        </select>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        label={"Create Job"}
                        disabled={loading}>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default JobCreatePage;
