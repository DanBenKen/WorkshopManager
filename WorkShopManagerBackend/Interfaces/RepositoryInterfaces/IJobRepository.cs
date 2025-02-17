using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IJobRepository
    {
        Task<Job?> GetJobByIdAsync(int id);
        Task<IEnumerable<Job>> GetAllJobsAsync();
        Task<Job> AddJobAsync(Job job);
        Task UpdateJobAsync(int id, Job existingJob);
        bool DeleteJob(Job job);
    }
}
