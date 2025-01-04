import React from 'react';

const Workers = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Workers</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2">John Doe</td>
                        <td className="border p-2">Worker</td>
                        <td className="border p-2">
                            <button>Edit</button> | <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Workers;
