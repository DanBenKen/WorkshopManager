import React from "react";
import { useNavigate } from "react-router-dom";
import useWorkers from "../../../hooks/useWorkers";
import Button from "../../atoms/Button";

const WorkersCountWidget = () => {
    const navigate = useNavigate();
    const { count, isLoading, error } = useWorkers(null, "count");
    const { unemployedCount, isLoading: isLoadingUnemployed, error: unemployedError } = useWorkers(null, "unemployedCount");

    const handleViewUnemployed = () => {
        navigate("/workers/without-jobs");
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Workers</h3>
            <div className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                {isLoading ? "Loading..." : error ? "Error" : count}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Unemployed Workers</h3>
            <div className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                {isLoadingUnemployed ? "Loading..." : unemployedError ? "Error" : unemployedCount}
            </div>

            <Button 
                onClick={handleViewUnemployed}
                className="mt-2"
            >
                View Unemployed Workers
            </Button>
        </div>
    );
};

export default WorkersCountWidget;