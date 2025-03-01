import React from "react";
import { useNavigate } from "react-router-dom";
import useSupplies from "../../../hooks/useSupplies";
import Button from "../../atoms/Button";
import { FaBox, FaExclamationTriangle, FaArrowRight } from "react-icons/fa";
import StatCard from "../../atoms/StatCard";

const SuppliesCountWidget = () => {
    const navigate = useNavigate();
    const { totalSupplies, isLoading: isLoadingTotal, error: totalError } = useSupplies();
    const { lowStockSuppliesCount, isLoading: isLoadingLowStock, error: lowStockError } = useSupplies();

    return (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center min-w-[320px] transform transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaBox className="text-blue-400 animate-pulse" />
                <span>Supplies Overview</span>
            </h3>

            <div className="w-full space-y-6">
                <StatCard
                    label="Total Supplies"
                    value={isLoadingTotal ? "..." : totalSupplies || "No Data"}
                    isLoading={isLoadingTotal}
                    error={totalError}
                    icon={FaBox}
                    colorClass="text-blue-400"
                    className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    iconBackground="bg-blue-400/20"
                />

                <StatCard
                    label="Low Stock Supplies"
                    value={isLoadingLowStock ? "..." : lowStockSuppliesCount || "No Data"}
                    isLoading={isLoadingLowStock}
                    error={lowStockError}
                    icon={FaExclamationTriangle}
                    colorClass={lowStockSuppliesCount === 0 ? "text-green-400" : "text-red-400"}
                    className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    iconBackground={lowStockSuppliesCount === 0 ? "bg-green-400/20" : "bg-red-400/20"}
                />
            </div>

            <Button
                onClick={() => navigate("/supplies/low-stock", { state: { from: "/" } })}
                className="mt-6 w-full group"
                variant="gradient"
            >
                <span className="flex items-center justify-center gap-2">
                    View Low Stock Supplies
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
            </Button>
        </div>
    );
};

export default SuppliesCountWidget;
