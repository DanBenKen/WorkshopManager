import React, { useState, useEffect } from 'react';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import TableActions from './TableActions';

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches)
            setMatches(media.matches);

        const listener = (e) => setMatches(e.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
}

const Row = ({ data, columns, onDetails, customAction }) => {
    const [quantity, setQuantity] = useState(0);
    const isLargeScreen = useMediaQuery('(min-width: 451px)');

    const isCustomActionValid = customAction && (customAction.requiresInput ? quantity > 0 : true);

    const handleCustomActionClick = () => {
        if (isCustomActionValid) {
            customAction.requiresInput ? customAction.onClick(quantity) : customAction.onClick();
            setQuantity(0);
        }
    };

    return (
        <TableRow>
            {columns.map((col, index) => (
                <TableCell key={`${data.id}-${index}`}>
                    {col.render ? col.render(data) : data[col.field]}
                </TableCell>
            ))}
            <TableCell>
                <TableActions
                    onDetails={() => onDetails(data)}
                    onCustomAction={isLargeScreen && customAction ? handleCustomActionClick : null}
                    customButtonLabel={customAction?.label}
                />
                {customAction?.requiresInput && isLargeScreen && (
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border border-gray-300 p-2 rounded w-full md:w-auto"
                        placeholder="Quantity"
                    />
                )}
            </TableCell>
        </TableRow>
    );
};

export default Row;
