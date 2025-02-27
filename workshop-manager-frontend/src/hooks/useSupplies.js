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

    /* ==========================
        Error Handling
    ========================== */
    const handleError = useCallback((error) => {
        setError(error.message || 'An error occurred. Please try again later.');
    }, []);

    /* ==========================
        Async Action Handling
    ========================== */

    // Wrapper for asynchronous actions to handle loading and error states
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

    /* ==========================
        State Update Functions
    ========================== */

    // Updates the supplies state with the latest supply data
    const updateSuppliesState = useCallback((updatedSupply) => {
        setSupplies((prevSupplies) =>
            prevSupplies.map((item) => (item.id === updatedSupply.id ? updatedSupply : item)));
    }, []);

    // Removes a supply from the state based on its ID
    const removeSuppliesFromState = useCallback((id) => {
        setSupplies((prevSupplies) => prevSupplies.filter((supply) => supply.id !== id));
    }, []);

    // Adds a new supply to the state
    const addSuppliesToState = useCallback((newSupply) => {
        setSupplies((prevSupplies) => [...prevSupplies, newSupply]);
    }, []);

    /* ==========================
        Validation Functions
    ========================== */

    // Ensures the quantity is a positive number
    const isQuantityPositive = (quantity) => {
        if (quantity <= 0)
            throw new Error("Quantity must be a positive number.");
    };

    // Checks if the available stock is sufficient for the requested quantity
    const isStockInsufficient = (supplyQuantity, quantityToDeduct) => {
        if (supplyQuantity < quantityToDeduct)
            throw new Error('Insufficient stock quantity.');
    };

    /* ==========================
        Data Fetching
    ========================== */

    // Fetches all necessary data (supplies, total count, low stock count) in parallel
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

    // Fetch data when the component is mounted
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /* ==========================
        Quantity Management Handlers
    ========================== */

    // Deduct a certain quantity from a supply
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

    // Add more quantity to a supply
    const handleAddMoreQuantity = useCallback(async (supply, quantityToAdd) => {
        isQuantityPositive(quantityToAdd);

        await handleAsyncAction(async () => {
            const updatedSupply = { ...supply, quantity: supply.quantity + quantityToAdd }; // Increase the quantity
            updateSuppliesState(updatedSupply);
            await updateSupply(supply.id, updatedSupply);
        });
    }, [handleAsyncAction, updateSuppliesState]);

    /* ==========================
        CRUD Operations
    ========================== */

    // Fetch a single supply by ID
    const fetchSupplyById = useCallback(async (id) => {
        await handleAsyncAction(async () => {
            const data = await getSupplyById(id);
            setSupply(data);
        });
    }, [handleAsyncAction]);

    // Create a new supply and add it to the state
    const handleCreateSupply = useCallback(async (supplyData) => {
        const result = await handleAsyncAction(async () => {
            const createdSupply = await createSupply(supplyData);
            addSuppliesToState(createdSupply);
        });
        return result;
    }, [handleAsyncAction, addSuppliesToState]);

    // Update an existing supply and reflect the changes in state
    const handleUpdateSupply = useCallback(async (id, supplyData) => {
        const result = await handleAsyncAction(async () => {
            const updatedSupply = await updateSupply(id, supplyData);
            updateSuppliesState(updatedSupply);
        });
        return result;
    }, [handleAsyncAction, updateSuppliesState]);    

    // Delete a supply and remove it from the state
    const handleDeleteSupply = useCallback(async (id) => {
        const result = handleAsyncAction(async () => {
            await deleteSupply(id);
            removeSuppliesFromState(id);
        });
        return result;
    }, [handleAsyncAction, removeSuppliesFromState]);

    return {
        supply, supplies, isLoading, error, totalSupplies, lowStockSuppliesCount, lowStockSupplies,
        fetchSupplyById, handleCreateSupply, handleUpdateSupply, handleUpdateQuantity, handleDeleteSupply, handleAddMoreQuantity,
    };
};

export default useSupplies;
