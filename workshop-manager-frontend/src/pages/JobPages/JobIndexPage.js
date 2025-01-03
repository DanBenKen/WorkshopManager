import React, { useState, useEffect } from "react";
import JobService from "../../services/JobService";
import Button from "../../components/atoms/Button";
import JobTable from "../../components/organisms/JobTable";
import { useNavigate } from "react-router-dom";

const JobIndex = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleNewCreateClick = () => {
        navigate("/job/create");
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await JobService.getJobs();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-8 rounded-xl">
            <Button onClick={handleNewCreateClick} label="Create New Job" />
            <JobTable jobs={jobs} />
        </div>
    );
};

export default JobIndex;
