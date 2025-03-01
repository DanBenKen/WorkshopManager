import React from "react";

const StatCard = ({
    label,
    value,
    icon: Icon,
    colorClass,
    isLoading,
    error,
    className = "",
    iconBackground = "bg-opacity-20"
}) => {
    if (error) return <div className="text-red-400 p-4">Error loading data</div>;
    
    return (
        <div className={`p-4 rounded-xl ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${iconBackground} ${colorClass}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm text-gray-800">{label}</p>
                        <p className={`text-3xl font-bold ${colorClass}`}>
                            {isLoading ? (
                                <span className="inline-block h-8 w-16 bg-gray-600 animate-pulse rounded"></span>
                            ) : (
                                value
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
