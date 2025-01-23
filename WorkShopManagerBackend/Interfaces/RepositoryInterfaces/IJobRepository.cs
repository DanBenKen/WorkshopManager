using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IJobRepository
    {
        Task<Job?> GetJobByIdAsync(int id);
        Task<IEnumerable<Job>> GetAllJobsAsync();
        Task<Job> AddJobAsync(JobDTO jobDTO);
        Task UpdateJobAsync(int id, JobDTO jobDTO);
        bool DeleteJob(Job job);
    }
}
