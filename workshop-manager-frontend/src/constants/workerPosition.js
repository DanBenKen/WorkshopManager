export const WORKER_POSITIONS = {
    MECHANIC: {
        id: 1,
        label: 'Mechanic',
        apiValue: 'Mechanic'
    },
    ELECTRICIAN: {
        id: 2,
        label: 'Electrician',
        apiValue: 'Electrician'
    },
    PAINTER: {
        id: 3,
        label: 'Painter',
        apiValue: 'Painter'
    }
};

export const POSITION_OPTIONS = Object.values(WORKER_POSITIONS).map((position) => ({
    value: position.apiValue,
    label: position.label
}));
