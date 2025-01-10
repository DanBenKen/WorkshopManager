import React from 'react';

const Jobs = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Jobs</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Job Name</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Start Date</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2">Job 1</td>
                        <td className="border p-2">In Progress</td>
                        <td className="border p-2">2025-01-01</td>
                        <td className="border p-2">
                            <button>Edit</button> | <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">Job 2</td>
                        <td className="border p-2">Completed</td>
                        <td className="border p-2">2024-12-25</td>
                        <td className="border p-2">
                            <button>Edit</button> | <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Jobs;
