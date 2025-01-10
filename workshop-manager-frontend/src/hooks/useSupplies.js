import { useState, useEffect } from 'react';
import { createSupply, getSupplies, updateSupply, getSupplyById, deleteSupply } from '../services/supplyService';

const useSupplies = () => {
    const [supplies, setSupplies] = useState([]);
    const [supply, setSupply] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSupplies = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getSupplies();
                setSupplies(data);
            } catch (error) {
                console.error("Error fetching supplies:", error);
                setError("Failed to load supplies. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSupplies();
    }, []);

    const fetchSupplyById = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getSupplyById(id);
            setSupply(data);
        } catch (error) {
            console.error('Error fetching supply:', error);
            setError('Failed to fetch supply details.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSupply = async (supplyData) => {
        setIsLoading(true);
        setError('');

        try {
            const createdSupply = await createSupply(supplyData);
            setSupplies((prev) => [...prev, createdSupply]);
        } catch (error) {
            console.error('Error creating supply:', error);
            setError('Failed to create supply. Please try again later.');
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
            console.error('Error updating supply:', error);
            setError('Failed to update supply. Please try again later.');
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
            console.error('Error updating supply quantity:', error);
            setError(error.message || 'Failed to update quantity.');
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
            console.error('Error deleting supply:', err);
            setError('Failed to delete supply.');
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
            console.error("Error updating supply quantity:", error);
            setError("Failed to update supply quantity. Please try again later.");

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
    };
};

export default useSupplies;
