import React from "react";
import NavigationCard from "../molecules/NavigationCard";

const NavigationGrid = ({ items }) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
            <NavigationCard
                key={index}
                title={item.title}
                description={item.description}
                onNavigate={item.onNavigate}
            />
        ))}
    </div>
);

export default NavigationGrid;
