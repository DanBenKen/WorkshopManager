import React from "react";
import { useNavigate } from "react-router-dom";
import useWorkers from "../../../hooks/useWorkers";
import Button from "../../atoms/Button";
import { FaUsers, FaUserSlash } from "react-icons/fa";
import StatCard from "../../atoms/StatCard";

const WorkersCountWidget = () => {
    const navigate = useNavigate();
    const { counts, isLoading: isLoadingTotal, error: totalError } = useWorkers(null, "count");
    const { counts: unemployedCounts, isLoading: isLoadingUnemployed, error: unemployedError } = useWorkers(null, "unemployedCount");

    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center min-w-[300px]">
            <StatCard
                label="Total Workers"
                value={isLoadingTotal ? "Loading..." : (counts.total !== 0 ? counts.total : "0")}
                isLoading={isLoadingTotal}
                error={totalError}
                icon={FaUsers}
                colorClass="text-blue-400"
            />
            <StatCard
                label="Unemployed Workers"
                value={isLoadingUnemployed ? "Loading..." : (unemployedCounts.unemployed !== 0 ? unemployedCounts.unemployed : "0" || "No Data")}
                isLoading={isLoadingUnemployed}
                error={unemployedError}
                icon={FaUserSlash}
                colorClass={unemployedCounts.unemployed === 0 ? "text-green-400" : "text-red-400"}
            />
            <Button
                onClick={() => navigate("/workers/without-jobs", { state: { from: "/admin-dashboard" } })}
                className="mt-4"
            >
                View Unemployed Workers
            </Button>
        </div>
    );
};

export default WorkersCountWidget;
