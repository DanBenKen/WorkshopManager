import React, { useState, useEffect } from 'react';
import JobService from '../../services/JobService';
import Button from '../../components/atoms/Button';
import { useNavigate } from 'react-router-dom';

const JobIndex = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleNewCreateClick = () => {
        navigate('/job/create');
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await JobService.getJobs();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">All Jobs</h1>
            <Button onClick={handleNewCreateClick} label="Create New Job">
            </Button>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="text-left text-sm font-semibold text-gray-600 bg-gray-50 border-b">
                            <th className="py-3 px-6">Job Title</th>
                            <th className="py-3 px-6">Description</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                                    No jobs available
                                </td>
                            </tr>
                        ) : (
                            jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-gray-100 border-b">
                                    <td className="py-3 px-6 text-sm text-gray-800">{job.jobName}</td>
                                    <td className="py-3 px-6 text-sm text-gray-600">{job.description}</td>
                                    <td className="py-3 px-6 text-sm text-gray-500">{job.status}</td>
                                    <td className="py-3 px-6 text-sm">
                                        <button className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md px-2 py-1">
                                            Edit
                                        </button>
                                        <span className="mx-2 text-gray-400">|</span>
                                        <button className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-md px-2 py-1">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobIndex;
