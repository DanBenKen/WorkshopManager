import React from 'react';
import Label from '../atoms/Label';
import Text from '../atoms/Text';

const Detail = ({ label, value }) => {
    return (
        <div className="flex items-center space-x-4">
            <Label>{label}</Label>
            <Text content={value} />
        </div>
    );
};

export default Detail;
