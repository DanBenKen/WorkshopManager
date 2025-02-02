import React from "react";
import { useNavigate } from "react-router-dom";
import useWorkers from "../../../hooks/useWorkers";
import Button from "../../atoms/Button";
import { FaUsers, FaUserSlash } from "react-icons/fa";
import StatCard from "../../atoms/StatCard";

const WorkersCountWidget = () => {
    const navigate = useNavigate();
    const { count, isLoading: isLoadingTotal, error: totalError } = useWorkers(null, "count");
    const { unemployedCount, isLoading: isLoadingUnemployed, error: unemployedError } = useWorkers(null, "unemployedCount");

    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center min-w-[250px]">
            <StatCard
                label="Total Workers"
                value={isLoadingTotal ? "Loading..." : count || "No Data"}
                isLoading={isLoadingTotal}
                error={totalError}
                icon={FaUsers}
                colorClass="text-blue-400"
            />
            <StatCard
                label="Unemployed Workers"
                value={isLoadingUnemployed ? "Loading..." : unemployedCount || "No Data"}
                isLoading={isLoadingUnemployed}
                error={unemployedError}
                icon={FaUserSlash}
                colorClass={unemployedCount === 0 ? "text-green-400" : "text-red-400"}
            />
            <Button onClick={() => navigate("/workers/without-jobs")} className="mt-4">
                View Unemployed Workers
            </Button>
        </div>
    );
};

export default WorkersCountWidget;
