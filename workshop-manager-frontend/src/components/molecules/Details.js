import React from 'react';
import Label from '../atoms/Label';
import Text from '../atoms/Text';
import { formatLabel } from '../../utils/formatLabel';

const Detail = ({ label, value }) => {
    return (
        <div className="flex items-center space-x-4">
            <Label>{formatLabel(label)}</Label>
            <Text content={value} />
        </div>
    );
};

export default Detail;
