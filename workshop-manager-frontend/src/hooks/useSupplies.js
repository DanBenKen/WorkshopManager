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
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const handleAsyncAction = useCallback(async (actionFunc) => {
        setIsLoading(true);
        setError(null);
        try {
            await actionFunc();
            return true;
        } catch (error) {
            handleError(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [handleError]);

    const updateSuppliesState = useCallback((updatedSupply) => {
        setSupplies((prevSupplies) =>
            prevSupplies.map((item) => (item.id === updatedSupply.id ? updatedSupply : item)));
    }, []);

    const removeSuppliesFromState = useCallback((id) => {
        setSupplies((prevSupplies) => prevSupplies.filter((supply) => supply.id !== id));
    }, []);

    const addSuppliesToState = useCallback((newSupply) => {
        setSupplies((prevSupplies) => [...prevSupplies, newSupply]);
    }, []);

    const isQuantityPositive = (quantity) => {
        if (quantity <= 0)
            throw new Error("Quantity must be a positive number.");
    };

    const isStockInsufficient = (supplyQuantity, quantityToDeduct) => {
        if (supplyQuantity < quantityToDeduct)
            throw new Error('Insufficient stock quantity.');
    };

    const fetchData = useCallback(async () => {
        await handleAsyncAction(async () => {
            const [suppliesData, total, lowStockCount, lowStockData] = await Promise.all([
                getSupplies(),
                getTotalSuppliesCount(),
                getLowStockSuppliesCount(),
                getLowStockSupplies(),
            ]);
            setSupplies(suppliesData);
            setTotalSupplies(total);
            setLowStockSuppliesCount(lowStockCount);
            setLowStockSupplies(lowStockData);
        });
    }, [handleAsyncAction]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdateQuantity = useCallback(async (id, quantityToDeduct) => {
        const result = handleAsyncAction(async () => {
            const supply = await getSupplyById(id);
            isStockInsufficient(supply.quantity, quantityToDeduct);

            const updatedSupply = { ...supply, quantity: supply.quantity - quantityToDeduct };
            await updateSupply(id, updatedSupply);
            updateSuppliesState(updatedSupply);
        });
        return result;
    }, [handleAsyncAction, updateSuppliesState]);

    const handleAddMoreQuantity = useCallback(async (supply, quantityToAdd) => {
        isQuantityPositive(quantityToAdd);

        await handleAsyncAction(async () => {
            const updatedSupply = { ...supply, quantity: supply.quantity + quantityToAdd };
            updateSuppliesState(updatedSupply);
            await updateSupply(supply.id, updatedSupply);
        });
    }, [handleAsyncAction, updateSuppliesState]);

    const fetchSupplyById = useCallback(async (id) => {
        await handleAsyncAction(async () => {
            const data = await getSupplyById(id);
            setSupply(data);
        });
    }, [handleAsyncAction]);

    const handleCreateSupply = useCallback(async (supplyData) => {
        const result = await handleAsyncAction(async () => {
            const createdSupply = await createSupply(supplyData);
            addSuppliesToState(createdSupply);
        });
        return result;
    }, [handleAsyncAction, addSuppliesToState]);

    const handleUpdateSupply = useCallback(async (id, supplyData) => {
        const result = await handleAsyncAction(async () => {
            const updatedSupply = await updateSupply(id, supplyData);
            updateSuppliesState(updatedSupply);
        });
        return result;
    }, [handleAsyncAction, updateSuppliesState]);

    const handleDeleteSupply = useCallback(async (id) => {
        const result = handleAsyncAction(async () => {
            await deleteSupply(id);
            removeSuppliesFromState(id);
        });
        return result;
    }, [handleAsyncAction, removeSuppliesFromState]);

    return {
        supply, supplies, isLoading, error, totalSupplies, lowStockSuppliesCount, lowStockSupplies, fetchData,
        fetchSupplyById, handleCreateSupply, handleUpdateSupply, handleUpdateQuantity, handleDeleteSupply, handleAddMoreQuantity, clearError,
    };
};

export default useSupplies;
