import React from 'react';

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
                    className="border rounded-lg p-4 sm:p-6 shadow-md hover:shadow-2xl transition-shadow relative group w-full h-auto"
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

export default CardData;
