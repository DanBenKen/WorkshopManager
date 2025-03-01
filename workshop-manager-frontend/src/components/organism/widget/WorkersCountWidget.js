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
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center min-w-[320px] transform transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaUsers className="text-blue-400 animate-pulse" />
                <span>Workers Overview</span>
            </h3>

            <div className="w-full space-y-6">
                <StatCard
                    label="Total Workers"
                    value={isLoadingTotal ? "..." : (counts.total !== 0 ? counts.total : "0")}
                    isLoading={isLoadingTotal}
                    error={totalError}
                    icon={FaUsers}
                    colorClass="text-blue-400"
                    className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    iconBackground="bg-blue-400/20"
                />

                <StatCard
                    label="Unemployed Workers"
                    value={isLoadingUnemployed ? "..." : (unemployedCounts.unemployed !== 0 ? unemployedCounts.unemployed : "0")}
                    isLoading={isLoadingUnemployed}
                    error={unemployedError}
                    icon={FaUserSlash}
                    colorClass={unemployedCounts.unemployed === 0 ? "text-green-400" : "text-red-400"}
                    className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    iconBackground={unemployedCounts.unemployed === 0 ? "bg-green-400/20" : "bg-red-400/20"}
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
