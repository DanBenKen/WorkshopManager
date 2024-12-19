using WorkshopManager.DTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IJobService
    {
        Task<Job> CreateJobAsync(JobDTO jobDTO);
        Task<Job> GetJobAsync(int id);
    }
}
