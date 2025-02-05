import { useState, useEffect } from 'react';
import { 
    getSupplies, 
    getSupplyById, 
    getTotalSuppliesCount, 
    getLowStockSuppliesCount, 
    createSupply, 
    updateSupply, 
    deleteSupply, 
    getLowStockSupplies 
} from '../services/supplyService';

const useSupplies = () => {
    const [supplies, setSupplies] = useState([]);
    const [supply, setSupply] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalSupplies, setTotalSupplies] = useState(0);
    const [lowStockSuppliesCount, setLowStockSuppliesCount] = useState(0);
    const [lowStockSupplies, setLowStockSupplies] = useState([]);

    const handleError = (error) => {
        setError(error.message || 'An error occurred. Please try again later.');
        console.error(error);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
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
            } catch (error) {
                handleError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchSupplyById = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getSupplyById(id);
            setSupply(data);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSupply = async (supplyData) => {
        setIsLoading(true);
        setError(null);

        try {
            const createdSupply = await createSupply(supplyData);
            setSupplies((prev) => [...prev, createdSupply]);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateSupply = async (id, supplyData) => {
        setIsLoading(true);
        setError(null);

        try {
            const updatedSupply = await updateSupply(id, supplyData);
            setSupplies((prev) =>
                prev.map((supply) => (supply.id === id ? updatedSupply : supply))
            );
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateQuantity = async (id, quantity) => {
        setIsLoading(true);
        setError(null);

        try {
            const supply = await getSupplyById(id);
            if (supply.quantity < quantity) {
                throw new Error('Insufficient stock quantity.');
            }

            const updatedSupply = { ...supply, quantity: supply.quantity - quantity };
            await updateSupply(id, updatedSupply);

            setSupplies((prev) =>
                prev.map((item) => (item.id === id ? updatedSupply : item))
            );
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteSupply = async (id) => {
        setIsLoading(true);

        try {
            await deleteSupply(id);
            setSupplies((prev) => prev.filter((supply) => supply.id !== id));
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMoreQuantity = async (supply, quantityToAdd) => {
        if (quantityToAdd <= 0) {
            setError("Quantity to add must be a positive number.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedSupply = { ...supply, quantity: supply.quantity + quantityToAdd };

            setSupplies((prevSupplies) =>
                prevSupplies.map((item) =>
                    item.id === supply.id ? updatedSupply : item
                )
            );

            await updateSupply(supply.id, updatedSupply);

        } catch (error) {
            handleError(error);

            setSupplies((prevSupplies) =>
                prevSupplies.map((item) =>
                    item.id === supply.id ? supply : item
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

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
