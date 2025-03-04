﻿using WorkshopManager.DTOs.JobDTOs;

namespace WorkshopManager.DTOs.WorkerDTOs
{
    public class WorkerWithJobDTO
    {
        public int WorkerId { get; set; }
        public required string WorkerName { get; set; }
        public required List<JobDTO> Jobs { get; set; }
    }
}
