import { useState, useEffect, useCallback } from 'react';
import { getSupplies, getSupplyById, getTotalSuppliesCount, getLowStockSuppliesCount, createSupply, updateSupply, deleteSupply, getLowStockSupplies } from '../services/supplyService';

const useSupplies = () => {
    const [supplies, setSupplies] = useState([]);
    const [supply, setSupply] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalSupplies, setTotalSupplies] = useState(0);
    const [lowStockSuppliesCount, setLowStockSuppliesCount] = useState(0);
    const [lowStockSupplies, setLowStockSupplies] = useState([]);

    const handleError = useCallback((error) => {
        setError(error.message || 'An error occurred. Please try again later.');
        console.error(error);
    }, []);

    const handleAsyncAction = useCallback(async (actionFunc) => {
        setIsLoading(true);
        setError(null);
        try {
            await actionFunc();
            return true;
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [handleError]);

    useEffect(() => {
        const fetchData = async () => {
            await handleAsyncAction(async () => {
                const [suppliesData, total, lowStockCount, lowStockData] = await Promise.all([
                    getSupplies(),
                    getTotalSuppliesCount(),
                    getLowStockSuppliesCount(),
                    getLowStockSupplies()
                ]);
                setSupplies(suppliesData);
                setTotalSupplies(total);
                setLowStockSuppliesCount(lowStockCount);
                setLowStockSupplies(lowStockData);
            });
        };

        fetchData();
    }, [handleAsyncAction]);

    const fetchSupplyById = useCallback(async (id) => {
        await handleAsyncAction(async () => {
            const data = await getSupplyById(id);
            setSupply(data);
        });
    }, [handleAsyncAction]);

    const handleCreateSupply = useCallback(async (supplyData) => {
        const success = await handleAsyncAction(async () => {
            const createdSupply = await createSupply(supplyData);
            setSupplies((prev) => [...prev, createdSupply]);
        });
        return success;
    }, [handleAsyncAction]);

    const handleUpdateSupply = useCallback(async (id, supplyData) => {
        const success = await handleAsyncAction(async () => {
            const updatedSupply = await updateSupply(id, supplyData);
            setSupplies((prev) =>
                prev.map((supply) => (supply.id === id ? updatedSupply : supply))
            );
        });
        return success;
    }, [handleAsyncAction]);

    const handleUpdateQuantity = useCallback(async (id, quantity) => {
        await handleAsyncAction(async () => {
            const supply = await getSupplyById(id);
            if (supply.quantity < quantity) {
                throw new Error('Insufficient stock quantity.');
            }

            const updatedSupply = { ...supply, quantity: supply.quantity - quantity };
            await updateSupply(id, updatedSupply);

            setSupplies((prev) =>
                prev.map((item) => (item.id === id ? updatedSupply : item))
            );
        });
    }, [handleAsyncAction]);

    const handleDeleteSupply = useCallback(async (id) => {
        await handleAsyncAction(async () => {
            await deleteSupply(id);
            setSupplies((prev) => prev.filter((supply) => supply.id !== id));
        });
    }, [handleAsyncAction]);

    const handleAddMoreQuantity = useCallback(async (supply, quantityToAdd) => {
        if (quantityToAdd <= 0) {
            setError("Quantity to add must be a positive number.");
            return;
        }

        await handleAsyncAction(async () => {
            const updatedSupply = { ...supply, quantity: supply.quantity + quantityToAdd };

            setSupplies((prevSupplies) =>
                prevSupplies.map((item) =>
                    item.id === supply.id ? updatedSupply : item
                )
            );

            await updateSupply(supply.id, updatedSupply);
        });
    }, [handleAsyncAction]);

    return {
        supply,
        supplies,
        fetchSupplyById,
        handleCreateSupply,
        handleUpdateSupply,
        handleUpdateQuantity,
        handleDeleteSupply,
        handleAddMoreQuantity,
        isLoading,
        error,
        totalSupplies,
        lowStockSuppliesCount,
        lowStockSupplies,
    };
};

export default useSupplies;