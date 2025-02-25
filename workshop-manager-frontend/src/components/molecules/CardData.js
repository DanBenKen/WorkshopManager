import React from 'react';

const CardData = ({ data, renderItem }) => {
    return (
        <div className="divide-y divide-gray-200">
            {data.map((item) => (
                <div key={item.id} className="py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">{renderItem(item).title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{renderItem(item).description}</p>
                </div>
            ))}
        </div>
    );
};

export default CardData;
