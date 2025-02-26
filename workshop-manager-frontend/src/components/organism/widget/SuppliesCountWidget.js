import React from "react";
import { useNavigate } from "react-router-dom";
import useSupplies from "../../../hooks/useSupplies";
import Button from "../../atoms/Button";
import { FaBox, FaExclamationTriangle } from "react-icons/fa";
import StatCard from "../../atoms/StatCard";

const SuppliesCountWidget = () => {
    const navigate = useNavigate();
    const { totalSupplies, isLoading: isLoadingTotal, error: totalError } = useSupplies();
    const { lowStockSuppliesCount, isLoading: isLoadingLowStock, error: lowStockError } = useSupplies();

    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center min-w-[300px]">
            <StatCard
                label="Total Supplies"
                value={isLoadingTotal ? "Loading..." : totalSupplies || "No Data"}
                isLoading={isLoadingTotal}
                error={totalError}
                icon={FaBox}
                colorClass="text-blue-400"
            />
            <StatCard
                label="Low Stock Supplies"
                value={isLoadingLowStock ? "Loading..." : lowStockSuppliesCount || "No Data"}
                isLoading={isLoadingLowStock}
                error={lowStockError}
                icon={FaExclamationTriangle}
                colorClass={lowStockSuppliesCount === 0 ? "text-green-400" : "text-red-400"}
            />
            <Button onClick={() => navigate("/supplies/low-stock", { state: { from: "/" } })} className="mt-4">
                View Low Stock Supplies
            </Button>
        </div>
    );
};

export default SuppliesCountWidget;
