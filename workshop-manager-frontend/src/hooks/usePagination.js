import { useState, useEffect, useCallback } from 'react';

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // If the currentPage exceeds totalPages, adjust the currentPage.
    useEffect(() => {
        if (currentPage > totalPages)
            setCurrentPage(totalPages + 1);        
    }, [currentPage, totalPages]);

    // Changes the currentPage if the provided page number is within valid bounds.
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Computes the start and end indices for the current page and returns a slice of the data array corresponding to that page.
    const getPaginatedData = useCallback(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [currentPage, itemsPerPage, data]);

    return {
        currentPage, totalPages,
        goToPage, getPaginatedData,
    };
};

export default usePagination;
