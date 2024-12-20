﻿using WorkshopManager.Data;
using WorkshopManager.DTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IJobService
    {
        Task<Job> CreateJobAsync(JobDTO jobDTO);
        Task<Job> UpdateJobAsync(int id, JobDTO jobDTO);
        Task<bool> DeleteJobAsync(int id);
        Task<Job> GetJobAsync(int id);
    }
}
