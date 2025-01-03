import React from 'react';
import { Link } from 'react-router-dom';

const FrontPage = () => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold my-4">Welcome to WorkshopManager</h1>
            <p className="text-lg mb-8">This is the home page of your application.</p>
            
            <div className="space-x-4">
                <Link
                    to="/jobs"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                    Jobs
                </Link>
                <Link
                    to="/supplies"
                    className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500"
                >
                    Supplies
                </Link>
                <Link
                    to="/workers"
                    className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500"
                >
                    Workers
                </Link>
            </div>
        </div>
    );
};

export default FrontPage;
