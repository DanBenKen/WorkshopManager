import React from "react";
import { useNavigate } from "react-router-dom";
import useWorkers from "../../../hooks/useWorkers";
import Button from "../../atoms/Button";
import { FaUsers, FaUserSlash, FaArrowRight } from "react-icons/fa";
import StatCard from "../../atoms/StatCard";

const WorkersCountWidget = () => {
    const navigate = useNavigate();
    const { counts, isLoading: isLoadingTotal, error: totalError } = useWorkers("count");
    const { counts: unemployedCounts, isLoading: isLoadingUnemployed, error: unemployedError } = useWorkers("unemployedCount");

    return (
        <div className="rounded-2xl shadow-xl p-8 flex flex-col items-center text-center min-w-[320px] transform transition-all duration-300 hover:shadow-2xl 
            bg-white text-gray-800 border border-gray-200">
            
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaUsers className="text-blue-500 animate-pulse" />
                <span>Workers Overview</span>
            </h3>

            <div className="w-full space-y-6">
                <StatCard
                    label="Total Workers"
                    value={isLoadingTotal ? "..." : (counts.total !== 0 ? counts.total : "0")}
                    isLoading={isLoadingTotal}
                    error={totalError}
                    icon={FaUsers}
                    colorClass="text-blue-500"
                    className="bg-gray-100 hover:bg-gray-200 transition-colors"
                    iconBackground="bg-blue-100"
                />

                <StatCard
                    label="Unemployed Workers"
                    value={isLoadingUnemployed ? "..." : (unemployedCounts.unemployed !== 0 ? unemployedCounts.unemployed : "0")}
                    isLoading={isLoadingUnemployed}
                    error={unemployedError}
                    icon={FaUserSlash}
                    colorClass={unemployedCounts.unemployed === 0 ? "text-green-500" : "text-red-500"}
                    className="bg-gray-100 hover:bg-gray-200 transition-colors"
                    iconBackground={unemployedCounts.unemployed === 0 ? "bg-green-100" : "bg-red-100"}
                />
            </div>

            <Button
                onClick={() => navigate("/workers/without-jobs", { state: { from: "/" } })}
                className="mt-6 w-full group"
                variant="gradient"
            >
                <span className="flex items-center justify-center gap-2">
                    View Unemployed Workers
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
            </Button>
        </div>
    );
};

export default WorkersCountWidget;
