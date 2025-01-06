import { useState, useEffect } from 'react';
import { createSupply, getSupplies, updateSupply, getSupplyById } from '../services/supplyService';

const useSupplies = (supplyId) => {
    const [supplies, setSupplies] = useState([]);
    const [supply, setSupply] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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

    useEffect(() => {
        if (supplyId) {
            const fetchSupply = async () => {
                setIsLoading(true);
                try {
                    const data = await getSupplyById(supplyId);
                    setSupply(data);
                } catch (error) {
                    setError('Failed to load supply details.');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchSupply();
        }
    }, [supplyId]);

    const handleCreateSupply = async (supplyData) => {
        setIsLoading(true);
        setError('');

        try {
            await createSupply(supplyData);
        } catch (error) {
            setError('Failed to create supply. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateSupply = async (id, supplyData) => {
        setIsLoading(true);
        setError(null);

        try {
            await updateSupply(id, supplyData);
        } catch (error) {
            setError('Failed to update supply. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        supplies,
        supply,
        isLoading,
        error,
        handleCreateSupply,
        handleUpdateSupply,
    };
};

export default useSupplies;
