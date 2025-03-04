import React from 'react';

const Details = ({ label, value }) => {
  return (
    <div className="flex items-center space-x-4">
      {label && <span className="font-bold">{label}</span>}
      <span>{value}</span>
    </div>
  );
};

export default Details;
