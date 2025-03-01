import React from 'react';
import PropTypes from 'prop-types';

const CardData = ({
    data,
    renderItem,
    onItemClick,
    gridClasses = "grid-cols-[repeat(auto-fit,minmax(250px,1fr))] sm:grid-cols-2 lg:grid-cols-3",
    keyProp = "id",
    actionIcon: ActionIcon,
    actionTitle = "View details",
    additionalActionIcon: AdditionalActionIcon,
    additionalActionTitle = "Add Quantity",
    onAdditionalAction
}) => {
    return (
        <div className={`grid ${gridClasses} gap-4 sm:gap-6 justify-items-center`}>
            {data.map((item) => (
                <div
                    key={item[keyProp]}
                    className="border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow relative group w-full h-auto"
                >
                    {renderItem(item)}

                    {onItemClick && ActionIcon && (
                        <button
                            onClick={() => onItemClick(item)}
                            className="absolute bottom-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                            title={actionTitle}
                        >
                            <ActionIcon className="w-5 h-5 text-gray-500" />
                        </button>
                    )}

                    {onAdditionalAction && AdditionalActionIcon && (
                        <button
                            onClick={() => onAdditionalAction(item, 1)}
                            className="absolute bottom-2 right-10 p-1 hover:bg-gray-100 rounded-full transition-colors"
                            title={additionalActionTitle}
                        >
                            <AdditionalActionIcon className="w-5 h-5 text-blue-500" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

CardData.propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    gridClasses: PropTypes.string,
    keyProp: PropTypes.string,
    actionIcon: PropTypes.elementType,
    actionTitle: PropTypes.string,
    additionalActionIcon: PropTypes.elementType,
    additionalActionTitle: PropTypes.string,
    onAdditionalAction: PropTypes.func,
};

export default CardData;
