import React from "react";
import { useNavigate } from "react-router-dom";
import useJobs from "../../../hooks/useJobs";
import Button from "../../atoms/Button";
import { FaCheckCircle, FaSyncAlt, FaArrowRight } from "react-icons/fa";
import StatCard from "../../atoms/StatCard";

const JobsProgressWidget = () => {
    const navigate = useNavigate();
    const { totalCompleted, inProgress, isLoading, error } = useJobs();

    return (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center min-w-[320px] transform transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaSyncAlt className="text-blue-400 animate-pulse" />
                <span>Job Progress Overview</span>
            </h3>

            <div className="w-full space-y-6">
                <StatCard
                    label="Completed Jobs"
                    value={isLoading ? "..." : totalCompleted}
                    isLoading={isLoading}
                    error={error}
                    icon={FaCheckCircle}
                    colorClass="text-green-400"
                    className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    iconBackground="bg-green-400/20"
                />

                <StatCard
                    label="Jobs in Progress"
                    value={isLoading ? "..." : inProgress}
                    isLoading={isLoading}
                    error={error}
                    icon={FaSyncAlt}
                    colorClass="text-yellow-400"
                    className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    iconBackground="bg-yellow-400/20"
                />
            </div>

            <Button
                onClick={() => navigate("/jobs/list-in-progress", { state: { from: "/" } })}
                className="mt-6 w-full group"
                variant="gradient"
            >
                <span className="flex items-center justify-center gap-2">
                    View Jobs In Progress
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
            </Button>
        </div>
    );
};

export default JobsProgressWidget;
