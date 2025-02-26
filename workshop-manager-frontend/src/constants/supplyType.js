export const SUPPLY_TYPE = {
    MOTOROIL: {
        id: 1,
        label: 'Motor Oil',
        apiValue: 'Motor Oil'
    },
    LUBRICANT: {
        id: 2,
        label: 'Lubricant',
        apiValue: 'Lubricant'
    },
    COOLANT: {
        id: 3,
        label: 'Coolant',
        apiValue: 'Coolant'
    },
    BRAKEFLUID: {
        id: 4,
        label: 'Brake Fluid',
        apiValue: 'Brake Fluid'
    },
    FILTER: {
        id: 5,
        label: 'Filter',
        apiValue: 'Filter'
    }
};

export const SUPPLY_OPTIONS = Object.values(SUPPLY_TYPE).map((position) => ({
    value: position.apiValue,
    label: position.label
}));
