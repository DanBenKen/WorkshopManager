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
        <div className="rounded-2xl shadow-xl p-8 flex flex-col items-center text-center min-w-[320px] transform transition-all duration-300 hover:shadow-2xl 
            bg-white text-gray-800 border border-gray-200">
            
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaSyncAlt className="text-blue-500 animate-pulse" />
                <span>Job Progress Overview</span>
            </h3>

            <div className="w-full space-y-6">
                <StatCard
                    label="Completed Jobs"
                    value={isLoading ? "..." : totalCompleted}
                    isLoading={isLoading}
                    error={error}
                    icon={FaCheckCircle}
                    colorClass="text-green-500"
                    className="bg-gray-100 hover:bg-gray-200 transition-colors"
                    iconBackground="bg-green-100"
                />

                <StatCard
                    label="Jobs in Progress"
                    value={isLoading ? "..." : inProgress}
                    isLoading={isLoading}
                    error={error}
                    icon={FaSyncAlt}
                    colorClass="text-yellow-500"
                    className="bg-gray-100 hover:bg-gray-200 transition-colors"
                    iconBackground="bg-yellow-100"
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
