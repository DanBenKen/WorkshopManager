import { JOB_STATUSES } from "../constants/jobStatus";
import { SUPPLY_TYPE } from "../constants/supplyType";
import { WORKER_POSITIONS } from "../constants/workerPosition";

export const QUANTITY_THRESHOLDS = {
    GREEN: 50,
    YELLOW: 25,
    ORANGE: 10,
};

export const GetQuantityColor = (quantity) => {
    switch (true) {
        case quantity >= QUANTITY_THRESHOLDS.GREEN:
            return 'text-green-500';
        case quantity >= QUANTITY_THRESHOLDS.YELLOW:
            return 'text-yellow-500';
        case quantity >= QUANTITY_THRESHOLDS.ORANGE:
            return 'text-orange-500';
        default:
            return 'text-red-500';
    }
};

export const GetSupplyTypeColor = (supplyType) => {
    switch (supplyType) {
        case SUPPLY_TYPE.MOTOROIL.apiValue:
            return 'text-blue-800';
        case SUPPLY_TYPE.LUBRICANT.apiValue:
            return 'text-amber-500';
        case SUPPLY_TYPE.COOLANT.apiValue:
            return 'text-green-500';
        case SUPPLY_TYPE.BRAKEFLUID.apiValue:
            return 'text-red-500';
        case SUPPLY_TYPE.FILTER.apiValue:
            return 'text-indigo-600';
        default:
            return 'text-gray-400';
    }
};

export const GetPositionColor = (position) => { 
    switch (position) {
        case WORKER_POSITIONS.MECHANIC.apiValue:
            return 'text-orange-500';
        case WORKER_POSITIONS.ELECTRICIAN.apiValue:
            return 'text-yellow-500';
        case WORKER_POSITIONS.PAINTER.apiValue:
            return 'text-red-500';
        default:
            return 'text-gray-400';
    }
};

export const GetJobStatusColor = (status) => {
    switch (status) {
        case JOB_STATUSES.COMPLETED.apiValue:
            return 'text-green-500';
        case JOB_STATUSES.IN_PROGRESS.apiValue:
            return 'text-yellow-500';
        default:
            return 'text-gray-400';
    }
};
