import React from "react";
import Button from "../atoms/Button";

const NavigationCard = ({ title, description, onNavigate }) => (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <Button
            label="Go"
            onClick={onNavigate}
            className="mt-4 w-full text-center"
        />
    </div>
);

export default NavigationCard;
