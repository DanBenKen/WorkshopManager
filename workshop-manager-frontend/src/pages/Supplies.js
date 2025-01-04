import React from 'react';

const Supplies = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Supplies</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Supply Name</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2">Supply 1</td>
                        <td className="border p-2">50</td>
                        <td className="border p-2">$100</td>
                        <td className="border p-2">Available</td>
                        <td className="border p-2">
                            <button>Edit</button> | <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">Supply 2</td>
                        <td className="border p-2">20</td>
                        <td className="border p-2">$50</td>
                        <td className="border p-2">Out of Stock</td>
                        <td className="border p-2">
                            <button>Edit</button> | <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Supplies;
