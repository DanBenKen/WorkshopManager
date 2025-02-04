import React from "react";

const StatCard = ({ label, value, isLoading, error, icon: Icon, colorClass }) => {
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white flex items-center mt-3 gap-2">
                <Icon className={`${colorClass} text-xl`} />
                {label}
            </h3>
            <div className={`mt-2 text-4xl font-bold ${colorClass}`}>
                {isLoading ? "Loading..." : error ? "Error" : value}
            </div>
        </div>
    );
};

export default StatCard;