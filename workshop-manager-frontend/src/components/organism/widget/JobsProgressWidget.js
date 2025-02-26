import React from "react";
import { useNavigate } from "react-router-dom";
import useJobs from "../../../hooks/useJobs";
import Button from "../../atoms/Button";
import { FaCheckCircle, FaSyncAlt } from "react-icons/fa";
import StatCard from "../../atoms/StatCard";

const JobsProgressWidget = () => {
    const navigate = useNavigate();

    const {
        totalCompleted,
        isLoading: isLoadingCompleted,
        error: completedError
    } = useJobs(null, "completedCount");

    const {
        inProgress,
        isLoading: isLoadingInProgress,
        error: inProgressError
    } = useJobs(null, "inProgressCount");

    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center min-w-[300px]">
            <StatCard
                label="Completed Jobs"
                value={isLoadingCompleted ? "Loading..." : totalCompleted}
                isLoading={isLoadingCompleted}
                error={completedError}
                icon={FaCheckCircle}
                colorClass="text-green-400"
            />

            <StatCard
                label="Jobs in Progress"
                value={isLoadingInProgress ? "Loading..." : inProgress}
                isLoading={isLoadingInProgress}
                error={inProgressError}
                icon={FaSyncAlt}
                colorClass="text-yellow-400"
            />

            <Button
                onClick={() => navigate("/jobs/list-in-progress")}
                className="mt-4"
            >
                View Jobs In Progress
            </Button>
        </div>
    );
};

export default JobsProgressWidget;