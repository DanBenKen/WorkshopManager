import React from 'react';
import Text from '../atoms/Text'

const CardData = ({ data, renderItem }) => {
    return (
        <div className="divide-y divide-gray-200">
            {data.map((item) => (
                <div key={item.id} className="py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">{renderItem(item).title}</h3>
                    <Text className="text-sm mt-2" content={renderItem(item).description}></Text>
                    <Text className="text-sm mt-2" content={renderItem(item).id}></Text>
                </div>
            ))}
        </div>
    );
};

export default CardData;
