export const JOB_STATUSES = {
    IN_PROGRESS: {
      id: 1,
      label: 'In Progress',
      apiValue: 'In Progress'
    },
    COMPLETED: {
      id: 2,
      label: 'Completed',
      apiValue: 'Completed'
    }
  };
  
  export const STATUS_OPTIONS = Object.values(JOB_STATUSES).map((status) => ({
    value: status.id,
    label: status.label
  }));