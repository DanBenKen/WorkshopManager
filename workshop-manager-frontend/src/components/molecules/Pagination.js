import React from 'react';
import PaginationButton from '../atoms/PaginationButton';
import PageNumberButton from '../atoms/PageNumberButton';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-6 flex justify-center items-center space-x-2">
            <PaginationButton
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}
            >
                Previous
            </PaginationButton>

            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 3, totalPages)).map(number => (
                <PageNumberButton
                    key={number}
                    onClick={() => goToPage(number)}
                    isActive={currentPage === number}
                >
                    {number}
                </PageNumberButton>
            ))}

            <PaginationButton
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}
            >
                Next
            </PaginationButton>
        </div>
    );
};

export default Pagination;
